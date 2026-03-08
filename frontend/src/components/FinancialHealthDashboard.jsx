import React, { useState, useEffect } from "react";
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend
} from "recharts";
import { getFinancialHealthDashboard } from "../services/api";

export default function FinancialHealthDashboard({ userProfile }) {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            if (!userProfile) {
                setLoading(false);
                return;
            }

            try {
                const response = await getFinancialHealthDashboard(userProfile);
                setDashboardData(response.data);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [userProfile]);

    if (loading) {
        return <p className="text-center text-gray-600 p-8">Loading financial health data...</p>;
    }

    if (!dashboardData) {
        return (
            <div className="p-8 text-center bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-gray-700">Enter your profile to view financial health dashboard</p>
            </div>
        );
    }

    const gradeColors = {
        "A": "rgb(34, 197, 94)",
        "B": "rgb(59, 130, 246)",
        "C": "rgb(234, 179, 8)",
        "D": "rgb(249, 115, 22)",
        "F": "rgb(239, 68, 68)"
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Financial Health Score Dashboard</h2>

            {/* Overall Score Card */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 mb-2">Overall Financial Health Score</p>
                        <h3 className="text-5xl font-bold text-blue-600 mb-2">
                            {dashboardData.overall_score.toFixed(1)}/100
                        </h3>
                        <p className="text-lg font-semibold">
                            Grade: <span
                                style={{ color: gradeColors[dashboardData.score_grade] }}
                            >
                                {dashboardData.score_grade}
                            </span>
                        </p>
                    </div>
                    <div>
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="rgb(59, 130, 246)"
                                    strokeWidth="8"
                                    strokeDasharray={`${2.827 * dashboardData.overall_score} 282.7`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                                <text
                                    x="50"
                                    y="55"
                                    textAnchor="middle"
                                    fontSize="24"
                                    fontWeight="bold"
                                    fill="rgb(59, 130, 246)"
                                >
                                    {dashboardData.overall_score.toFixed(0)}%
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Income Score", value: dashboardData.metrics.income_score, color: "text-green-600", bg: "bg-green-50" },
                    { label: "Debt Management", value: dashboardData.metrics.debt_score, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Credit Utilization", value: dashboardData.metrics.credit_score, color: "text-purple-600", bg: "bg-purple-50" },
                    { label: "Account History", value: dashboardData.metrics.account_score, color: "text-orange-600", bg: "bg-orange-50" }
                ].map((metric, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border ${metric.bg}`}>
                        <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                        <p className={`text-4xl font-bold ${metric.color}`}>
                            {metric.value.toFixed(0)}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                            <div
                                className={`h-2 rounded-full ${metric.color.replace("text-", "bg-")}`}
                                style={{ width: `${metric.value}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Radar Chart */}
            {dashboardData.radar_data && (
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Financial Profile Analysis</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <RadarChart data={dashboardData.radar_data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="metric" />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            <Radar
                                name="Your Score"
                                dataKey="value"
                                stroke="rgb(59, 130, 246)"
                                fill="rgb(59, 130, 246)"
                                fillOpacity={0.6}
                            />
                            <Tooltip />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Comparison with Average */}
            {dashboardData.comparison_with_average && (
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Comparison with Average Borrower</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Income Comparison */}
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-3">Annual Income</p>
                            <p className="text-3xl font-bold text-green-600 mb-2">
                                ${(dashboardData.comparison_with_average.income.user_value).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                Avg: ${(dashboardData.comparison_with_average.income.average_value).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                            </p>
                            <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${dashboardData.comparison_with_average.income.above_average
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                {dashboardData.comparison_with_average.income.above_average ? "Above Average ✓" : "Below Average ✗"}
                            </span>
                        </div>

                        {/* DTI Comparison */}
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-3">Debt-to-Income Ratio</p>
                            <p className="text-3xl font-bold text-blue-600 mb-2">
                                {(dashboardData.comparison_with_average.dti.user_value).toFixed(1)}%
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                Avg: {(dashboardData.comparison_with_average.dti.average_value).toFixed(1)}%
                            </p>
                            <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${dashboardData.comparison_with_average.dti.below_average
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                {dashboardData.comparison_with_average.dti.below_average ? "Better ✓" : "Worse ✗"}
                            </span>
                        </div>

                        {/* Credit Utilization Comparison */}
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-800 mb-3">Credit Utilization</p>
                            <p className="text-3xl font-bold text-purple-600 mb-2">
                                {(dashboardData.comparison_with_average.credit_utilization.user_value).toFixed(1)}%
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                Avg: {(dashboardData.comparison_with_average.credit_utilization.average_value).toFixed(1)}%
                            </p>
                            <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${dashboardData.comparison_with_average.credit_utilization.below_average
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}>
                                {dashboardData.comparison_with_average.credit_utilization.below_average ? "Lower ✓" : "Higher ✗"}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Recommendations */}
            {dashboardData.recommendations && dashboardData.recommendations.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">💡 Recommendations</h3>
                    <ul className="space-y-2">
                        {dashboardData.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-blue-800 flex items-start">
                                <span className="mr-3">→</span>
                                <span>{rec}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}