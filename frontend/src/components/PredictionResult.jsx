import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function PredictionResult({ result }) {
    if (!result) return null;

    const riskColors = {
        "Low Risk": "rgb(34, 197, 94)",
        "Medium Risk": "rgb(234, 179, 8)",
        "High Risk": "rgb(239, 68, 68)"
    };

    const approvalColors = {
        "APPROVED": "rgb(34, 197, 94)",
        "UNDER_REVIEW": "rgb(234, 179, 8)",
        "REJECTED": "rgb(239, 68, 68)"
    };

    // Data for approval decision pie chart
    const approvalData = [
        { name: "Risk Probability", value: parseFloat((result.probability * 100).toFixed(2)) },
        { name: "Safety Margin", value: parseFloat(((1 - result.probability) * 100).toFixed(2)) }
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Prediction Result</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Risk Level Card */}
                <div className="p-4 border rounded-lg" style={{ borderColor: riskColors[result.risk_level] }}>
                    <p className="text-sm text-gray-600 mb-2">Risk Category</p>
                    <p
                        className="text-3xl font-bold"
                        style={{ color: riskColors[result.risk_level] }}
                    >
                        {result.risk_level}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Score: {result.risk_score}/100</p>
                </div>

                {/* Approval Decision Card */}
                <div className="p-4 border rounded-lg" style={{ borderColor: approvalColors[result.approval.decision] }}>
                    <p className="text-sm text-gray-600 mb-2">Loan Status</p>
                    <p
                        className="text-3xl font-bold"
                        style={{ color: approvalColors[result.approval.decision] }}
                    >
                        {result.approval.decision === "APPROVED" ? "✅ Approved" :
                            result.approval.decision === "UNDER_REVIEW" ? "⚠️ Under Review" :
                                "❌ Rejected"}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{result.approval.description}</p>
                </div>
            </div>

            {/* Financial Health Score */}
            <div className="p-4 mb-6 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Financial Health Score</p>
                <div className="flex items-center">
                    <div className="text-4xl font-bold text-blue-600 mr-4">
                        {result.financial_health_score.toFixed(0)}
                    </div>
                    <div className="flex-1">
                        <div className="w-full bg-gray-300 rounded-full h-3">
                            <div
                                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${result.financial_health_score}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Category: {result.score_category}</p>
                    </div>
                </div>
            </div>

            {/* Probability Visualization */}
            <div className="p-4 mb-6 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-4">Default Probability</p>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={approvalData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            <Cell fill="rgb(239, 68, 68)" />
                            <Cell fill="rgb(34, 197, 94)" />
                        </Pie>
                        <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <p className="text-center mt-4 text-sm text-gray-600">
                    Default Probability: <strong>{(result.probability * 100).toFixed(2)}%</strong>
                </p>
            </div>

            {/* Approval Decision Details */}
            <div className="p-4 mb-6 bg-indigo-50 border border-indigo-200 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-900 mb-3">Decision Details</h3>
                <p className="text-indigo-800 mb-2">
                    <strong>Decision:</strong> {result.approval.description}
                </p>
                <p className="text-indigo-800 text-sm">
                    <strong>Reason:</strong> {result.approval.reason}
                </p>
            </div>

            {/* Preventive Suggestions */}
            {result.suggestions && result.suggestions.length > 0 && (
                <div className="p-4 mb-6 bg-amber-50 border border-amber-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-amber-900 mb-3">💡 Suggestions to Improve</h3>
                    {result.suggestions.map((s, idx) => (
                        <div key={idx} className="mb-3 p-3 bg-white rounded border border-amber-100">
                            <p className="font-semibold text-sm text-amber-900">{s.category}</p>
                            <p className="text-sm text-gray-700 mt-1">{s.suggestion}</p>
                            <div className="text-xs text-gray-500 mt-2">
                                Current: {s.current_value} → Target: {s.target_value}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Feature Importance */}
            {result.feature_importance && (
                <div className="p-4 mb-6 bg-purple-50 border border-purple-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">📊 Key Risk Factors</h3>
                    <p className="text-sm text-purple-800 mb-3">{result.feature_importance_explanation}</p>
                    <div className="space-y-2">
                        {Object.entries(result.feature_importance).map(([feature, importance], idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-700">{feature}</span>
                                    <span className="font-semibold text-purple-600">{(importance * 100).toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-300 rounded-full h-2">
                                    <div
                                        className="bg-purple-600 h-2 rounded-full"
                                        style={{ width: `${importance * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Model Predictions Comparison */}
            {result.model_predictions && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">🤖 Model Predictions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {Object.entries(result.model_predictions).map(([model, pred], idx) => (
                            <div key={idx} className="p-3 bg-white rounded border border-green-100">
                                <p className="font-semibold text-sm text-green-900 capitalize">
                                    {model.replace(/_/g, " ")}
                                </p>
                                <p className="text-sm text-gray-700 mt-1">
                                    Probability: {(pred.probability * 100).toFixed(2)}%
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}