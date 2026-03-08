"""
Finance Risk ML Service - Flask Backend
Includes: Risk prediction, Explainable AI, Preventive suggestions, Financial Health Score, 
Loan approval decision, Model comparison, What-If analysis, Affordability calculator, 
Survival probability, and Portfolio analytics
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
import json
from datetime import datetime
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# Load models and preprocessors
try:
    rf_model = joblib.load('rf_model.pkl')
    xgb_model = joblib.load('xgb_model.pkl')
    lr_model = joblib.load('lr_model.pkl')
    scaler = joblib.load('scaler.pkl')
except:
    print("Warning: Some models not found. Make sure to run train_models.py first")

# Load metadata
try:
    with open('feature_names.json', 'r') as f:
        feature_names = json.load(f)
    with open('feature_importance.json', 'r') as f:
        feature_importance = json.load(f)
    with open('model_comparison.json', 'r') as f:
        model_comparison = json.load(f)
    with open('data_stats.json', 'r') as f:
        data_stats = json.load(f)
except:
    print("Warning: Some metadata files not found")
    feature_names = []
    feature_importance = {}
    model_comparison = {}
    data_stats = {}

# Database initialization for portfolio analytics
DB_FILE = 'portfolio.db'

def init_db():
    """Initialize SQLite database for portfolio analytics"""
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS predictions
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  timestamp TEXT,
                  user_data TEXT,
                  prediction REAL,
                  probability REAL,
                  risk_level TEXT,
                  risk_score INTEGER,
                  approved INTEGER,
                  model_used TEXT)''')
    conn.commit()
    conn.close()

init_db()

# ========== UTILITY FUNCTIONS ==========

def get_risk_level(prob):
    """Convert probability to risk level (Feature 1: Risk Categorization)"""
    if prob < 0.2:
        return "Low Risk"
    elif prob < 0.5:
        return "Medium Risk"
    else:
        return "High Risk"

def get_risk_color(risk_level):
    """Get color representation for risk level"""
    colors = {
        "Low Risk": "green",
        "Medium Risk": "yellow",
        "High Risk": "red"
    }
    return colors.get(risk_level, "gray")

def get_feature_importance(model_name='random_forest', top_n=10):
    """Feature Importance (Feature 2: Explainable AI)"""
    if model_name == 'random_forest':
        importance_dict = feature_importance.get('random_forest', {})
    else:
        importance_dict = feature_importance.get('xgboost', {})
    
    # Return top N features
    sorted_features = sorted(importance_dict.items(), key=lambda x: x[1], reverse=True)
    return {name: float(importance) for name, importance in sorted_features[:top_n]}

def get_financial_health_score(probability):
    """Calculate Financial Health Score (Feature 5: Financial Health Dashboard)"""
    return max(0, min(100, 100 * (1 - probability)))

def get_preventive_suggestions(data):
    """Feature 3: Preventive Action Suggestions"""
    suggestions = []
    
    dti = float(data.get("dti", 0))
    revol_util = float(data.get("revol_util", 0))
    annual_inc = float(data.get("annual_inc", 1))
    loan_amnt = float(data.get("loan_amnt", 0))
    
    if dti > 40:
        suggestions.append({
            "category": "Debt",
            "suggestion": "Reduce debt-to-income ratio by paying off small loans.",
            "current_value": f"{dti:.2f}%",
            "target_value": "< 40%"
        })
    
    if revol_util > 70:
        suggestions.append({
            "category": "Credit",
            "suggestion": "Reduce credit card utilization below 50%.",
            "current_value": f"{revol_util:.2f}%",
            "target_value": "< 50%"
        })
    
    if annual_inc < 30000:
        suggestions.append({
            "category": "Income",
            "suggestion": "Increase income stability before applying for large loans.",
            "current_value": f"${annual_inc:,.2f}",
            "target_value": "> $30,000"
        })
    
    if loan_amnt > annual_inc * 0.5:
        max_loan = annual_inc * 0.5
        suggestions.append({
            "category": "Loan Amount",
            "suggestion": f"Consider reducing loan amount to ${max_loan:,.2f}",
            "current_value": f"${loan_amnt:,.2f}",
            "target_value": f"< ${max_loan:,.2f}"
        })
    
    return suggestions

def get_loan_approval_decision(probability):
    """Feature 6: Loan Approval Decision Engine"""
    if probability < 0.25:
        decision = "APPROVED"
        description = "Low default risk - Loan approved"
        reason = "Default probability is below 25% threshold"
    elif probability < 0.4:
        decision = "UNDER_REVIEW"
        description = "Moderate default risk - Requires manual review"
        reason = "Default probability between 25% and 40%"
    else:
        decision = "REJECTED"
        description = "High default risk - Loan rejected"
        reason = "Default probability exceeds 40% threshold"
    
    return {
        "decision": decision,
        "description": description,
        "reason": reason,
        "threshold": 0.25
    }

def get_survival_probability_data(probability, months=60):
    """Feature 10: Survival Probability Graph (approximation)"""
    # Approximate survival probability over time
    # Assuming exponential decay based on default probability
    data_points = []
    decay_rate = probability / months
    
    for month in range(0, months + 1, 6):
        survival_prob = max(0, 1 - (decay_rate * month))
        data_points.append({
            "month": month,
            "survival_probability": float(survival_prob),
            "default_risk": float(1 - survival_prob)
        })
    
    return data_points

# ========== API ENDPOINTS ==========

@app.route('/predict', methods=['POST'])
def predict():
    """Main prediction endpoint with all features"""
    try:
        data = request.json
        
        # Prepare data
        # feature_data = {col: data.get(col, 0) for col in feature_names}
        # df_pred = pd.DataFrame([feature_data])
        
        # # Handle missing values
        # df_pred = df_pred.fillna(0)
        # Convert term like "36 months" → 36
        if isinstance(data.get("term"), str):
            data["term"] = int(data["term"].split()[0])

        # Encode categorical values
        home_map = {"RENT":0,"OWN":1,"MORTGAGE":2,"OTHER":3}
        ver_map = {"Not Verified":0,"Source Verified":1,"Verified":2}

        data["home_ownership"] = home_map.get(data.get("home_ownership"),0)
        data["verification_status"] = ver_map.get(data.get("verification_status"),0)

        # Ensure all required features exist
        feature_data = {}
        for col in feature_names:
            feature_data[col] = data.get(col, 0)

        df_pred = pd.DataFrame([feature_data])
        df_pred = df_pred.fillna(0)
        
        # Get predictions from all models
        rf_prediction = rf_model.predict(df_pred)[0]
        rf_probability = rf_model.predict_proba(df_pred)[0][1]
        
        xgb_prediction = xgb_model.predict(df_pred)[0]
        xgb_probability = xgb_model.predict_proba(df_pred)[0][1]
        
        lr_df_scaled = scaler.transform(df_pred)
        lr_prediction = lr_model.predict(lr_df_scaled)[0]
        lr_probability = lr_model.predict_proba(lr_df_scaled)[0][1]
        
        # Use Random Forest as primary model
        probability = rf_probability
        prediction = int(rf_prediction)
        
        # Feature 1: Risk Categorization
        risk_level = get_risk_level(probability)
        risk_color = get_risk_color(risk_level)
        risk_score = int(probability * 100)
        
        # Feature 2: Explainable AI - Feature Importance
        important_features = get_feature_importance('random_forest', top_n=5)
        
        # Feature 3: Preventive Suggestions
        suggestions = get_preventive_suggestions(data)
        
        # Feature 5: Financial Health Score
        health_score = get_financial_health_score(probability)
        
        # Feature 6: Loan Approval Decision
        approval_decision = get_loan_approval_decision(probability)
        
        # Feature 10: Survival Probability
        survival_data = get_survival_probability_data(probability)
        
        # Store in portfolio database
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('''INSERT INTO predictions 
                     (timestamp, user_data, prediction, probability, risk_level, risk_score, approved, model_used)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
                  (datetime.now().isoformat(), json.dumps(data), float(probability), 
                   float(probability), risk_level, risk_score, 
                   1 if approval_decision['decision'] == 'APPROVED' else 0, 'random_forest'))
        conn.commit()
        conn.close()
        
        return jsonify({
            # Original fields
            "prediction": prediction,
            "probability": float(probability),
            "risk_score": risk_score,
            "risk_level": risk_level,
            "risk_color": risk_color,
            
            # Feature 2: Explainable AI
            "feature_importance": important_features,
            "feature_importance_explanation": f"The top risk factors for this borrower are {list(important_features.keys())[0]} and {list(important_features.keys())[1] if len(important_features) > 1 else 'others'}",
            
            # Feature 3: Preventive Suggestions
            "suggestions": suggestions,
            
            # Feature 5: Financial Health Score
            "financial_health_score": float(health_score),
            "score_category": "Good" if health_score >= 70 else "Fair" if health_score >= 50 else "Poor",
            
            # Feature 6: Loan Approval
            "approval": approval_decision,
            
            # Model Comparison
            "model_predictions": {
                "random_forest": {
                    "probability": float(rf_probability),
                    "prediction": int(rf_prediction)
                },
                "xgboost": {
                    "probability": float(xgb_probability),
                    "prediction": int(xgb_prediction)
                },
                "logistic_regression": {
                    "probability": float(lr_probability),
                    "prediction": int(lr_prediction)
                }
            },
            
            # Feature 10: Survival Probability
            "survival_probability": survival_data
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/whatif', methods=['POST'])
def what_if_analysis():
    """Feature 7: What-If Analysis Simulator"""
    try:
        data = request.json
        base_data = data.get('base_data', {})
        parameters_to_change = data.get('parameters', {})
        
        results = {
            'base': {},
            'modified': {},
            'comparison': {}
        }
        
        # Get base prediction
        feature_data_base = {col: base_data.get(col, 0) for col in feature_names}
        df_base = pd.DataFrame([feature_data_base]).fillna(0)
        base_prob = rf_model.predict_proba(df_base)[0][1]
        base_score = get_financial_health_score(base_prob)
        
        results['base'] = {
            'probability': float(base_prob),
            'risk_level': get_risk_level(base_prob),
            'financial_health_score': float(base_score)
        }
        
        # Get modified prediction
        modified_data = base_data.copy()
        modified_data.update(parameters_to_change)
        
        feature_data_modified = {col: modified_data.get(col, 0) for col in feature_names}
        df_modified = pd.DataFrame([feature_data_modified]).fillna(0)
        modified_prob = rf_model.predict_proba(df_modified)[0][1]
        modified_score = get_financial_health_score(modified_prob)
        
        results['modified'] = {
            'probability': float(modified_prob),
            'risk_level': get_risk_level(modified_prob),
            'financial_health_score': float(modified_score)
        }
        
        # Calculate differences
        prob_diff = (base_prob - modified_prob) * 100
        score_diff = modified_score - base_score
        
        results['comparison'] = {
            'probability_change': f"{prob_diff:+.2f}%",
            'score_change': f"{score_diff:+.2f}",
            'improved': modified_prob < base_prob,
            'insight': f"If you adjust {list(parameters_to_change.keys())[0]}, your financial health score changes from {base_score:.0f} to {modified_score:.0f}"
        }
        
        return jsonify(results)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/affordability-calculator', methods=['POST'])
def affordability_calculator():
    """Feature 8: Loan Affordability Calculator"""
    try:
        data = request.json
        annual_income = float(data.get('annual_inc', 0))
        current_debt_monthly = float(data.get('current_debt', 0))
        dti_threshold = float(data.get('dti_threshold', 43))  # Standard DTI threshold is 43%
        
        max_monthly_debt = (annual_income / 12) * (dti_threshold / 100)
        available_for_loan = max(0, max_monthly_debt - current_debt_monthly)
        
        # Estimate loan amount (assuming 60-month term at 15% interest)
        loan_term_months = 60
        monthly_rate = 0.15 / 12
        
        if monthly_rate > 0:
            max_loan_amount = available_for_loan * (((1 + monthly_rate) ** loan_term_months - 1) / 
                             (monthly_rate * (1 + monthly_rate) ** loan_term_months))
        else:
            max_loan_amount = available_for_loan * loan_term_months
        
        return jsonify({
            "annual_income": float(annual_income),
            "monthly_income": float(annual_income / 12),
            "max_monthly_debt_allowed": float(max_monthly_debt),
            "current_monthly_debt": float(current_debt_monthly),
            "available_for_new_loan": float(available_for_loan),
            "max_loan_amount": float(max(0, max_loan_amount)),
            "dti_threshold": float(dti_threshold),
            "recommendation": f"You can safely afford a loan of up to ${max(0, max_loan_amount):,.2f}"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/model-comparison', methods=['GET'])
def get_model_comparison():
    """Feature 7: Model Comparison Results"""
    try:
        return jsonify({
            "models": model_comparison,
            "best_model": max(model_comparison, key=lambda x: model_comparison[x]['auc']),
            "best_auc": max([m['auc'] for m in model_comparison.values()])
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/feature-importance', methods=['GET'])
def get_feature_importance_endpoint():
    """Feature 2: Get Feature Importance"""
    try:
        model_type = request.args.get('model', 'random_forest')
        top_n = int(request.args.get('top_n', 10))
        
        importance_dict = get_feature_importance(model_type, top_n)
        
        return jsonify({
            "model": model_type,
            "features": importance_dict,
            "explanation": f"These are the top {top_n} most important features for {model_type} model",
            "interpretation": "Higher values indicate greater influence on the default prediction"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/portfolio-analytics', methods=['GET'])
def portfolio_analytics():
    """Feature 9: Portfolio Analytics Dashboard"""
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        
        # Get all predictions
        c.execute('SELECT * FROM predictions')
        predictions = c.fetchall()
        conn.close()
        
        if not predictions:
            return jsonify({
                "total_applications": 0,
                "approved_count": 0,
                "rejected_count": 0,
                "approval_rate": 0,
                "average_risk_score": 0,
                "high_risk_count": 0,
                "message": "No predictions recorded yet"
            })
        
        # Calculate statistics
        total = len(predictions)
        approved = sum(1 for p in predictions if p[8] == 1)  # approved column
        rejected = total - approved
        
        risk_scores = [p[6] for p in predictions]  # risk_score column
        avg_risk = sum(risk_scores) / len(risk_scores) if risk_scores else 0
        high_risk = sum(1 for rs in risk_scores if rs > 50)
        
        return jsonify({
            "total_applications": total,
            "approved_count": approved,
            "rejected_count": rejected,
            "pending_review_count": sum(1 for p in predictions if p[5] == 'Medium Risk'),
            "approval_rate": float(approved / total * 100) if total > 0 else 0,
            "average_risk_score": float(avg_risk),
            "high_risk_count": high_risk,
            "high_risk_percentage": float(high_risk / total * 100) if total > 0 else 0,
            "default_rate": float(data_stats.get('default_rate', 0) * 100)
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/financial-health-dashboard', methods=['POST'])
def financial_health_dashboard():
    """Feature 5: Financial Health Score Dashboard"""
    try:
        data = request.json
        
        # Calculate health metrics
        annual_inc = float(data.get('annual_inc', data_stats.get('mean_annual_inc', 50000)))
        dti = float(data.get('dti', data_stats.get('mean_dti', 15)))
        revol_util = float(data.get('revol_util', data_stats.get('mean_revol_util', 50)))
        total_acc = float(data.get('total_acc', 10))
        
        # Normalize metrics to 0-100 scale
        income_score = min(100, (annual_inc / 100000) * 100)
        debt_score = max(0, 100 - (dti * 2.5))  # Higher DTI = lower score
        credit_score = max(0, 100 - (revol_util * 0.7))  # Higher utilization = lower score
        account_score = min(100, (total_acc / 20) * 100)
        
        overall_score = (income_score + debt_score + credit_score + account_score) / 4
        
        # Comparison with average
        avg_annual_inc = data_stats.get('mean_annual_inc', 50000)
        avg_dti = data_stats.get('mean_dti', 15)
        avg_revol_util = data_stats.get('mean_revol_util', 50)
        
        comparison = {
            'income': {
                'user_value': float(annual_inc),
                'average_value': float(avg_annual_inc),
                'above_average': annual_inc > avg_annual_inc
            },
            'dti': {
                'user_value': float(dti),
                'average_value': float(avg_dti),
                'below_average': dti < avg_dti
            },
            'credit_utilization': {
                'user_value': float(revol_util),
                'average_value': float(avg_revol_util),
                'below_average': revol_util < avg_revol_util
            }
        }
        
        return jsonify({
            "overall_score": float(overall_score),
            "score_grade": "A" if overall_score >= 80 else "B" if overall_score >= 70 else "C" if overall_score >= 60 else "D" if overall_score >= 50 else "F",
            "metrics": {
                "income_score": float(income_score),
                "debt_score": float(debt_score),
                "credit_score": float(credit_score),
                "account_score": float(account_score)
            },
            "radar_data": [
                {"metric": "Income", "value": float(income_score)},
                {"metric": "Debt Management", "value": float(debt_score)},
                {"metric": "Credit Utilization", "value": float(credit_score)},
                {"metric": "Account History", "value": float(account_score)}
            ],
            "comparison_with_average": comparison,
            "recommendations": [
                f"Your income is {'above' if annual_inc > avg_annual_inc else 'below'} average",
                f"Your DTI is {'better' if dti < avg_dti else 'worse'} than average",
                f"Your credit utilization is {'lower' if revol_util < avg_revol_util else 'higher'} than average"
            ]
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "ML Service running successfully"})

if __name__ == "__main__":
    app.run(port=5000, debug=False)







# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib
# import pandas as pd
# import numpy as np
# import json
# import os

# app = Flask(__name__)
# CORS(app)

# # ==============================
# # Load Models and Metadata
# # ==============================

# MODEL_DIR = os.path.dirname(os.path.abspath(__file__))

# try:
#     rf_model = joblib.load(os.path.join(MODEL_DIR, "rf_model.pkl"))
#     xgb_model = joblib.load(os.path.join(MODEL_DIR, "xgb_model.pkl"))
#     lr_model = joblib.load(os.path.join(MODEL_DIR, "lr_model.pkl"))
#     scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))

#     print("✅ Models loaded successfully")

# except Exception as e:
#     print("❌ Model loading failed:", e)
#     rf_model = None
#     xgb_model = None
#     lr_model = None
#     scaler = None


# try:
#     with open(os.path.join(MODEL_DIR, "feature_names.json")) as f:
#         feature_names = json.load(f)

#     with open(os.path.join(MODEL_DIR, "feature_importance.json")) as f:
#         feature_importance = json.load(f)

# except Exception as e:
#     print("❌ Metadata loading failed:", e)
#     feature_names = []
#     feature_importance = {}

# # ==============================
# # Categorical Encodings
# # (Must match training)
# # ==============================

# HOME_OWNERSHIP_MAP = {
#     "RENT": 0,
#     "OWN": 1,
#     "MORTGAGE": 2,
#     "OTHER": 3,
#     "NONE": 4,
#     "ANY": 5
# }

# VERIFICATION_STATUS_MAP = {
#     "Not Verified": 0,
#     "Source Verified": 1,
#     "Verified": 2
# }

# # ==============================
# # Helper Functions
# # ==============================

# def preprocess_input(data):

#     processed = data.copy()

#     # Convert term
#     if isinstance(processed.get("term"), str):
#         processed["term"] = int(processed["term"].split()[0])

#     # Encode categorical values
#     processed["home_ownership"] = HOME_OWNERSHIP_MAP.get(
#         processed.get("home_ownership"), 0
#     )

#     processed["verification_status"] = VERIFICATION_STATUS_MAP.get(
#         processed.get("verification_status"), 0
#     )

#     # Build dataframe with correct feature order
#     input_data = {col: processed.get(col, 0) for col in feature_names}

#     df = pd.DataFrame([input_data])
#     df = df.fillna(0)

#     return df


# def get_risk_level(prob):

#     if prob < 0.2:
#         return "Low Risk"
#     elif prob < 0.5:
#         return "Medium Risk"
#     else:
#         return "High Risk"


# # ==============================
# # Routes
# # ==============================

# @app.route("/health", methods=["GET"])
# def health():
#     return jsonify({
#         "status": "ok",
#         "message": "ML Service running"
#     })


# @app.route("/predict", methods=["POST"])
# def predict():

#     if rf_model is None:
#         return jsonify({"error": "Model not loaded"}), 500

#     try:

#         data = request.json

#         print("Incoming request:", data)

#         df = preprocess_input(data)

#         # Random Forest
#         rf_pred = rf_model.predict(df)[0]
#         rf_prob = rf_model.predict_proba(df)[0][1]

#         # XGBoost
#         xgb_pred = xgb_model.predict(df)[0]
#         xgb_prob = xgb_model.predict_proba(df)[0][1]

#         # Logistic Regression
#         df_scaled = scaler.transform(df)
#         lr_pred = lr_model.predict(df_scaled)[0]
#         lr_prob = lr_model.predict_proba(df_scaled)[0][1]

#         probability = float(rf_prob)

#         result = {
#             "prediction": int(rf_pred),
#             "probability": probability,
#             "risk_score": int(probability * 100),
#             "risk_level": get_risk_level(probability),

#             "model_predictions": {
#                 "random_forest": {
#                     "prediction": int(rf_pred),
#                     "probability": float(rf_prob)
#                 },
#                 "xgboost": {
#                     "prediction": int(xgb_pred),
#                     "probability": float(xgb_prob)
#                 },
#                 "logistic_regression": {
#                     "prediction": int(lr_pred),
#                     "probability": float(lr_prob)
#                 }
#             },

#             "feature_importance": dict(
#                 sorted(
#                     feature_importance.get("random_forest", {}).items(),
#                     key=lambda x: x[1],
#                     reverse=True
#                 )[:5]
#             )
#         }

#         return jsonify(result)

#     except Exception as e:

#         print("Prediction error:", e)

#         return jsonify({
#             "error": str(e)
#         }), 500


# # ==============================
# # Start Server
# # ==============================

# if __name__ == "__main__":
#     print("Starting ML service...")
#     print("Working directory:", MODEL_DIR)
#     print("Available files:", os.listdir(MODEL_DIR))

#     app.run(port=5000)