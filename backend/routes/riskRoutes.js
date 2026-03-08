import express from "express"
import {
    predictRisk,
    whatIfAnalysis,
    getAffordabilityCalculator,
    getModelComparison,
    getFeatureImportance,
    getPortfolioAnalytics,
    getFinancialHealthDashboard
} from "../controllers/riskControllers.js"

const router = express.Router()

// Risk Prediction
router.post("/predict", predictRisk)

// Financial Health & Analytics
router.post("/financial-health-dashboard", getFinancialHealthDashboard)
router.get("/portfolio-analytics", getPortfolioAnalytics)

// What-If & Affordability
router.post("/whatif", whatIfAnalysis)
router.post("/affordability-calculator", getAffordabilityCalculator)

// Model & Feature Information
router.get("/model-comparison", getModelComparison)
router.get("/feature-importance", getFeatureImportance)

export default router