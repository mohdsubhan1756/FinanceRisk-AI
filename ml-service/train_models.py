"""
Training script for multiple ML models
Trains Logistic Regression, Random Forest, and XGBoost models
Saves models and feature importance information
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, roc_auc_score, auc, roc_curve
import joblib
import json
import warnings
warnings.filterwarnings('ignore')

# Load data
df = pd.read_csv("lending_club.csv")

# Convert term to numeric
df['term'] = df['term'].str.extract('(\d+)').astype(int)

# Select features and target
feature_cols = ['loan_amnt', 'term', 'int_rate', 'installment', 'emp_length', 
                'annual_inc', 'dti', 'open_acc', 'pub_rec', 'revol_bal', 
                'revol_util', 'total_acc', 'mort_acc', 'pub_rec_bankruptcies']

X = df[feature_cols].copy()
y = df['loan_status'].copy()

# Handle categorical features
categorical_cols = ['home_ownership', 'verification_status']
for col in categorical_cols:
    if col in df.columns:
        le = LabelEncoder()
        X[col] = le.fit_transform(df[col].fillna('Unknown'))
        feature_cols.append(col)

# Handle missing values
X = X.fillna(X.median())

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Store feature names for later use
feature_names = feature_cols if feature_cols else X.columns.tolist()

# === LOGISTIC REGRESSION ===
print("Training Logistic Regression...")
lr_model = LogisticRegression(max_iter=1000, random_state=42)
lr_model.fit(X_train_scaled, y_train)
lr_pred = lr_model.predict(X_test_scaled)
lr_pred_proba = lr_model.predict_proba(X_test_scaled)[:, 1]

lr_metrics = {
    'accuracy': float(accuracy_score(y_test, lr_pred)),
    'precision': float(precision_score(y_test, lr_pred)),
    'recall': float(recall_score(y_test, lr_pred)),
    'auc': float(roc_auc_score(y_test, lr_pred_proba))
}
print(f"Logistic Regression - Accuracy: {lr_metrics['accuracy']:.4f}, AUC: {lr_metrics['auc']:.4f}")

# === RANDOM FOREST ===
print("Training Random Forest...")
rf_model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
rf_model.fit(X_train, y_train)
rf_pred = rf_model.predict(X_test)
rf_pred_proba = rf_model.predict_proba(X_test)[:, 1]

rf_metrics = {
    'accuracy': float(accuracy_score(y_test, rf_pred)),
    'precision': float(precision_score(y_test, rf_pred)),
    'recall': float(recall_score(y_test, rf_pred)),
    'auc': float(roc_auc_score(y_test, rf_pred_proba))
}
print(f"Random Forest - Accuracy: {rf_metrics['accuracy']:.4f}, AUC: {rf_metrics['auc']:.4f}")

# Extract feature importance from Random Forest
rf_feature_importance = dict(zip(feature_names, rf_model.feature_importances_.tolist()))
rf_feature_importance = dict(sorted(rf_feature_importance.items(), key=lambda x: x[1], reverse=True))

# === XGBOOST ===
print("Training XGBoost...")
xgb_model = XGBClassifier(n_estimators=100, random_state=42, eval_metric='logloss', verbosity=0)
xgb_model.fit(X_train, y_train)
xgb_pred = xgb_model.predict(X_test)
xgb_pred_proba = xgb_model.predict_proba(X_test)[:, 1]

xgb_metrics = {
    'accuracy': float(accuracy_score(y_test, xgb_pred)),
    'precision': float(precision_score(y_test, xgb_pred)),
    'recall': float(recall_score(y_test, xgb_pred)),
    'auc': float(roc_auc_score(y_test, xgb_pred_proba))
}
print(f"XGBoost - Accuracy: {xgb_metrics['accuracy']:.4f}, AUC: {xgb_metrics['auc']:.4f}")

# Extract feature importance from XGBoost
xgb_feature_importance = dict(zip(feature_names, xgb_model.feature_importances_.tolist()))
xgb_feature_importance = dict(sorted(xgb_feature_importance.items(), key=lambda x: x[1], reverse=True))

# === MODEL COMPARISON ===
model_comparison = {
    'Logistic Regression': lr_metrics,
    'Random Forest': rf_metrics,
    'XGBoost': xgb_metrics
}

print("\n=== MODEL COMPARISON ===")
comparison_df = pd.DataFrame(model_comparison).T
print(comparison_df)

# Save models
joblib.dump(lr_model, 'lr_model.pkl')
joblib.dump(rf_model, 'rf_model.pkl')
joblib.dump(xgb_model, 'xgb_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

# Save feature names
with open('feature_names.json', 'w') as f:
    json.dump(feature_names, f)

# Save feature importance
with open('feature_importance.json', 'w') as f:
    json.dump({
        'random_forest': rf_feature_importance,
        'xgboost': xgb_feature_importance
    }, f, indent=2)

# Save model comparison
with open('model_comparison.json', 'w') as f:
    json.dump(model_comparison, f, indent=2)

# Calculate training data statistics for What-If and portfolio analytics
data_stats = {
    'mean_annual_inc': float(df['annual_inc'].mean()),
    'median_annual_inc': float(df['annual_inc'].median()),
    'mean_dti': float(df['dti'].mean()),
    'mean_revol_util': float(df['revol_util'].mean()),
    'mean_loan_amnt': float(df['loan_amnt'].mean()),
    'total_records': int(len(df)),
    'default_rate': float(y.mean())
}

with open('data_stats.json', 'w') as f:
    json.dump(data_stats, f, indent=2)

print("\n✅ Models trained and saved successfully!")
print(f"Best performing model: {max(model_comparison, key=lambda x: model_comparison[x]['auc'])}")
