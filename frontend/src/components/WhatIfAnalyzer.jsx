import React, { useState } from "react";
import { whatIfAnalysis } from "../services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function WhatIfAnalyzer({ currentData }) {
    const [scenario, setScenario] = useState({
        annual_inc: currentData?.annual_inc || 50000,
        dti: currentData?.dti || 15,
        revol_util: currentData?.revol_util || 50,
        loan_amnt: currentData?.loan_amnt || 10000
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scenarioHistory, setScenarioHistory] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScenario({
            ...scenario,
            [name]: parseFloat(value)
        });
    };

    const runAnalysis = async () => {
        setLoading(true);
        try {
            const response = await whatIfAnalysis({
                base_data: currentData || scenario,
                parameters: scenario
            });
            setResult(response.data);

            // Add to history
            setScenarioHistory([...scenarioHistory, {
                label: `Scenario ${scenarioHistory.length + 1}`,
                score: response.data.modified?.financial_health_score || 0,
                probability: response.data.modified?.probability || 0,
                changes: scenario
            }]);
        } catch (err) {
            console.error("What-If analysis error:", err);
            alert("Error running what-if analysis: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const scenarioPresets = {
        "Increase Income": { annual_inc: (s) => s.annual_inc * 1.2 },
        "Reduce DTI": { dti: (s) => Math.max(5, s.dti * 0.8) },
        "Lower Credit Util": { revol_util: (s) => Math.max(10, s.revol_util * 0.6) },
        "Reduce Loan": { loan_amnt: (s) => s.loan_amnt * 0.9 }
    };

    const applyScenario = (type) => {
        const changes = scenarioPresets[type];
        const newScenario = { ...scenario };
        Object.keys(changes).forEach(key => {
            newScenario[key] = changes[key](scenario);
        });
        setScenario(newScenario);
    };

    const chartData = result ? [
        {
            name: "Base Profile",
            score: result.base?.financial_health_score || 0,
            probability: (result.base?.probability || 0) * 100
        },
        {
            name: "Modified Profile",
            score: result.modified?.financial_health_score || 0,
            probability: (result.modified?.probability || 0) * 100
        }
    ] : [];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">What-If Analysis Simulator</h2>
            <p className="text-gray-600 mb-6">
                Adjust your financial parameters to see how they impact your risk profile
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Panel */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Adjust Parameters</h3>

                    {/* Preset Buttons */}
                    <div className="space-y-2 mb-6">
                        <p className="text-sm font-semibold text-gray-700">Try Common Scenarios:</p>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.keys(scenarioPresets).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => applyScenario(type)}
                                    className="p-2 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">
                            Annual Income: ${scenario.annual_inc.toLocaleString()}
                        </label>
                        <input
                            type="range"
                            name="annual_inc"
                            min="20000"
                            max="200000"
                            step="5000"
                            value={scenario.annual_inc}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">
                            Debt-to-Income Ratio: {scenario.dti.toFixed(1)}%
                        </label>
                        <input
                            type="range"
                            name="dti"
                            min="5"
                            max="50"
                            step="1"
                            value={scenario.dti}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">
                            Credit Utilization: {scenario.revol_util.toFixed(1)}%
                        </label>
                        <input
                            type="range"
                            name="revol_util"
                            min="10"
                            max="100"
                            step="5"
                            value={scenario.revol_util}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2 text-gray-700">
                            Loan Amount: ${scenario.loan_amnt.toLocaleString()}
                        </label>
                        <input
                            type="range"
                            name="loan_amnt"
                            min="2000"
                            max="50000"
                            step="1000"
                            value={scenario.loan_amnt}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <button
                        onClick={runAnalysis}
                        disabled={loading}
                        className="w-full mt-6 bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
                    >
                        {loading ? "Analyzing..." : "Run Analysis"}
                    </button>
                </div>

                {/* Results Panel */}
                <div className="space-y-4">
                    {result && (
                        <>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Results</h3>

                            {/* Comparison Data */}
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-semibold text-blue-900 mb-3">Score Comparison</h4>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis yAxisId="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="score"
                                            stroke="rgb(59, 130, 246)"
                                            name="Health Score"
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="probability"
                                            stroke="rgb(239, 68, 68)"
                                            name="Default Risk %"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Base Profile */}
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-2">Base Profile</h4>
                                <p className="text-sm text-gray-700">
                                    Health Score: <strong>{result.base?.financial_health_score.toFixed(0)}</strong>
                                </p>
                                <p className="text-sm text-gray-700">
                                    Risk Level: <strong>{result.base?.risk_level}</strong>
                                </p>
                            </div>

                            {/* Modified Profile */}
                            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                <h4 className="font-semibold text-indigo-900 mb-2">Modified Profile</h4>
                                <p className="text-sm text-indigo-800">
                                    Health Score: <strong>{result.modified?.financial_health_score.toFixed(0)}</strong>
                                </p>
                                <p className="text-sm text-indigo-800">
                                    Risk Level: <strong>{result.modified?.risk_level}</strong>
                                </p>
                            </div>

                            {/* Comparison Summary */}
                            <div className={`p-4 rounded-lg border ${result.comparison?.improved
                                    ? "bg-green-50 border-green-200"
                                    : "bg-red-50 border-red-200"
                                }`}>
                                <h4 className={`font-semibold mb-2 ${result.comparison?.improved
                                        ? "text-green-900"
                                        : "text-red-900"
                                    }`}>
                                    {result.comparison?.improved ? "✓ Improved" : "✗ Declined"}
                                </h4>
                                <p className={`text-sm ${result.comparison?.improved
                                        ? "text-green-800"
                                        : "text-red-800"
                                    }`}>
                                    {result.comparison?.insight}
                                </p>
                                <p className="text-xs mt-2 text-gray-600">
                                    Score Change: {result.comparison?.score_change}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* History */}
            {scenarioHistory.length > 0 && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Scenario History</h3>
                    <div className="space-y-2">
                        {scenarioHistory.map((scenario, idx) => (
                            <div key={idx} className="p-3 bg-white rounded border border-gray-200">
                                <p className="font-semibold text-gray-800">{scenario.label}</p>
                                <p className="text-sm text-gray-600">
                                    Health Score: {scenario.score.toFixed(0)} |
                                    Default Probability: {(scenario.probability * 100).toFixed(2)}%
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}