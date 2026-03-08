import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:4000/api"
})

// Risk Prediction
export const predictRisk = (data) => API.post("/predict", data)

// Financial Health & Analytics
export const getFinancialHealthDashboard = (data) => API.post("/financial-health-dashboard", data)
export const getPortfolioAnalytics = () => API.get("/portfolio-analytics")

// What-If Analysis
export const whatIfAnalysis = (data) => API.post("/whatif", data)

// Affordability Calculator
export const getAffordabilityCalculator = (data) => API.post("/affordability-calculator", data)

// Model Information
export const getModelComparison = () => API.get("/model-comparison")
export const getFeatureImportance = (model = "random_forest", top_n = 10) =>
  API.get("/feature-importance", { params: { model, top_n } })

export default API