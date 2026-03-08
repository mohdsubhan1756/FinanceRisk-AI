// controllers/riskControllers.js
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:5000";

export const predictRisk = async (req, res) => {
    console.log("Received prediction request:", req.body);
    try {
        const response = await fetch(`${ML_SERVICE_URL}/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error(`ML Service error: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Prediction error:", err);
        res.status(500).json({ error: "Prediction service failed", details: err.message });
    }
};

export const whatIfAnalysis = async (req, res) => {
    try {
        const response = await fetch(`${ML_SERVICE_URL}/whatif`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("What-If analysis error:", err);
        res.status(500).json({ error: "What-If analysis failed" });
    }
};

export const getAffordabilityCalculator = async (req, res) => {
    try {
        const response = await fetch(`${ML_SERVICE_URL}/affordability-calculator`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        console.log("Affordability calculator response:", data);
        res.json(data);
    } catch (err) {
        console.error("Affordability calculator error:", err);
        res.status(500).json({ error: "Affordability calculator failed" });
    }
};

export const getModelComparison = async (req, res) => {
    try {
        const response = await fetch(`${ML_SERVICE_URL}/model-comparison`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Model comparison error:", err);
        res.status(500).json({ error: "Model comparison failed" });
    }
};

export const getFeatureImportance = async (req, res) => {
    try {
        const model = req.query.model || "random_forest";
        const top_n = req.query.top_n || 10;

        const response = await fetch(
            `${ML_SERVICE_URL}/feature-importance?model=${model}&top_n=${top_n}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }
        );

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Feature importance error:", err);
        res.status(500).json({ error: "Feature importance retrieval failed" });
    }
};

export const getPortfolioAnalytics = async (req, res) => {
    try {
        const response = await fetch(`${ML_SERVICE_URL}/portfolio-analytics`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Portfolio analytics error:", err);
        res.status(500).json({ error: "Portfolio analytics failed" });
    }
};

export const getFinancialHealthDashboard = async (req, res) => {
    try {
        const response = await fetch(`${ML_SERVICE_URL}/financial-health-dashboard`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Financial health dashboard error:", err);
        res.status(500).json({ error: "Financial health dashboard failed" });
    }
};