import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar,
    PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, Tooltip, CartesianGrid,
    Legend, ResponsiveContainer
} from "recharts";
import { getPortfolioAnalytics, getModelComparison, getFeatureImportance } from "../services/api";

export default function Dashboard() {
    const [portfolioData, setPortfolioData] = useState(null);
    const [modelData, setModelData] = useState(null);
    const [featureData, setFeatureData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [portfolio, models, features] = await Promise.all([
                    getPortfolioAnalytics().catch(() => ({})),
                    getModelComparison().catch(() => ({})),
                    getFeatureImportance().catch(() => ({}))
                ]);

                setPortfolioData(portfolio.data || {});
                setModelData(models.data || {});
                setFeatureData(features.data || {});
            } catch (err) {
                console.error("Dashboard data fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-600">Loading dashboard...</p>
            </div>
        );
    }

    // Portfolio Analytics Data
    const portfolioStats = portfolioData || {};
    const approvalRateData = [
        { name: "Approved", value: portfolioStats.approved_count || 0, fill: "rgb(34, 197, 94)" },
        { name: "Rejected", value: portfolioStats.rejected_count || 0, fill: "rgb(239, 68, 68)" },
        { name: "Under Review", value: portfolioStats.pending_review_count || 0, fill: "rgb(234, 179, 8)" }
    ];

    const riskDistribution = [
        {
            name: "Low Risk (<20%)",
            value: Math.round((portfolioStats.total_applications || 0) * 0.6),
            fill: "rgb(34, 197, 94)"
        },
        {
            name: "Medium Risk (20-50%)",
            value: Math.round((portfolioStats.total_applications || 0) * 0.3),
            fill: "rgb(234, 179, 8)"
        },
        {
            name: "High Risk (>50%)",
            value: portfolioStats.high_risk_count || 0,
            fill: "rgb(239, 68, 68)"
        }
    ];

    // Model Comparison Data
    const modelComparison = modelData.models ? Object.entries(modelData.models).map(([name, metrics]) => ({
        name,
        accuracy: (metrics.accuracy * 100).toFixed(1),
        precision: (metrics.precision * 100).toFixed(1),
        recall: (metrics.recall * 100).toFixed(1),
        auc: (metrics.auc * 100).toFixed(1)
    })) : [];

    // Feature Importance Data
    const featureImportanceData = featureData.features ? Object.entries(featureData.features).map(([name, importance]) => ({
        name,
        importance: (importance * 100).toFixed(1)
    })).slice(0, 10) : [];

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
                    <p className="text-gray-600">Portfolio overview and model performance analysis</p>
                </div>

                {/* Portfolio Metrics */}
                {portfolioStats.total_applications !== undefined && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="p-6 bg-white rounded-lg shadow">
                            <p className="text-sm text-gray-600 mb-2">Total Applications</p>
                            <p className="text-4xl font-bold text-blue-600">
                                {portfolioStats.total_applications}
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow">
                            <p className="text-sm text-gray-600 mb-2">Approval Rate</p>
                            <p className="text-4xl font-bold text-green-600">
                                {(portfolioStats.approval_rate || 0).toFixed(1)}%
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow">
                            <p className="text-sm text-gray-600 mb-2">Avg Risk Score</p>
                            <p className="text-4xl font-bold text-orange-600">
                                {(portfolioStats.average_risk_score || 0).toFixed(0)}
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow">
                            <p className="text-sm text-gray-600 mb-2">High Risk %</p>
                            <p className="text-4xl font-bold text-red-600">
                                {(portfolioStats.high_risk_percentage || 0).toFixed(1)}%
                            </p>
                        </div>
                    </div>
                )}

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Approval Rate Pie Chart */}
                    {approvalRateData.some(d => d.value > 0) && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Loan Decision Distribution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={approvalRateData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${value}`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {approvalRateData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Risk Distribution */}
                    {riskDistribution.some(d => d.value > 0) && (
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Risk Category Distribution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={riskDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${value}`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {riskDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                {/* Model Comparison */}
                {modelComparison.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow mb-8">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Model Performance Comparison</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={modelComparison}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="accuracy" fill="rgb(59, 130, 246)" name="Accuracy %" />
                                <Bar dataKey="precision" fill="rgb(34, 197, 94)" name="Precision %" />
                                <Bar dataKey="recall" fill="rgb(234, 179, 8)" name="Recall %" />
                                <Bar dataKey="auc" fill="rgb(168, 85, 247)" name="AUC %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Feature Importance */}
                {featureImportanceData.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Top Risk Factors</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={featureImportanceData}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={195} />
                                <Tooltip />
                                <Bar dataKey="importance" fill="rgb(168, 85, 247)" name="Importance %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Model Comparison Table */}
                {modelData.models && (
                    <div className="bg-white p-6 rounded-lg shadow mt-8">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Detailed Model Metrics</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-100 border-b">
                                    <tr>
                                        <th className="text-left p-3 font-semibold">Model</th>
                                        <th className="text-right p-3 font-semibold">Accuracy</th>
                                        <th className="text-right p-3 font-semibold">Precision</th>
                                        <th className="text-right p-3 font-semibold">Recall</th>
                                        <th className="text-right p-3 font-semibold">AUC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(modelData.models).map(([name, metrics], idx) => (
                                        <tr key={idx} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-medium">{name}</td>
                                            <td className="text-right p-3">{(metrics.accuracy * 100).toFixed(2)}%</td>
                                            <td className="text-right p-3">{(metrics.precision * 100).toFixed(2)}%</td>
                                            <td className="text-right p-3">{(metrics.recall * 100).toFixed(2)}%</td>
                                            <td className="text-right p-3 font-semibold text-blue-600">
                                                {(metrics.auc * 100).toFixed(2)}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}