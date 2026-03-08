import { Link } from "react-router-dom"

function Home() {
    const features = [
        {
            icon: "🎯",
            title: "Risk Categorization",
            description: "Get clear risk levels (Low/Medium/High) instead of just binary predictions"
        },
        {
            icon: "🔍",
            title: "Explainable AI",
            description: "Understand which factors impact your risk score the most"
        },
        {
            icon: "💡",
            title: "Smart Suggestions",
            description: "Receive actionable recommendations to improve your financial profile"
        },
        {
            icon: "📊",
            title: "Financial Health Dashboard",
            description: "Visualize your overall financial health with radar charts and gauges"
        },
        {
            icon: "✅",
            title: "Approval Decision Engine",
            description: "Automatic loan approval decision based on risk assessment"
        },
        {
            icon: "🤖",
            title: "Multiple AI Models",
            description: "Compare predictions from Logistic Regression, Random Forest, and XGBoost"
        },
        {
            icon: "🔄",
            title: "What-If Simulator",
            description: "See how changes to your finances impact your risk profile instantly"
        },
        {
            icon: "💳",
            title: "Affordability Calculator",
            description: "Calculate the maximum loan amount you can safely afford"
        },
        {
            icon: "📈",
            title: "Portfolio Analytics",
            description: "View comprehensive loan portfolio statistics and trends"
        },
        {
            icon: "📉",
            title: "Survival Probability",
            description: "Analyze borrower solvency probability over loan term"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    AI-Powered Financial Risk Assessment
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Transform your loan approval process with intelligent risk prediction,
                    explainable AI insights, and actionable financial guidance.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        to="/predict"
                        className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
                    >
                        Start Risk Assessment
                    </Link>
                    <Link
                        to="/dashboard"
                        className="px-8 py-4 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition text-lg"
                    >
                        View Analytics
                    </Link>
                </div>
            </section>

            {/* Key Metrics */}
            <section className="bg-white py-16 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <p className="text-4xl font-bold text-blue-600">3</p>
                        <p className="text-gray-600 mt-2">ML Models Compared</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-green-600">10</p>
                        <p className="text-gray-600 mt-2">Advanced Features</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-purple-600">100%</p>
                        <p className="text-gray-600 mt-2">Explainable</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold text-orange-600">Real-time</p>
                        <p className="text-gray-600 mt-2">Predictions</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                    Advanced Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200"
                        >
                            <p className="text-5xl mb-4">{feature.icon}</p>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-blue-50 py-20 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { num: 1, title: "Enter Profile", desc: "Input your financial information" },
                            { num: 2, title: "AI Analysis", desc: "Models analyze multiple risk factors" },
                            { num: 3, title: "Get Insights", desc: "Receive explainable predictions" },
                            { num: 4, title: "Take Action", desc: "Use suggestions to improve" }
                        ].map((step, idx) => (
                            <div key={idx} className="text-center">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                    {step.num}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Ready to Assess Your Financial Risk?
                </h2>
                <p className="text-xl text-gray-600 mb-10">
                    Get started with a comprehensive risk analysis in seconds
                </p>
                <Link
                    to="/predict"
                    className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-lg"
                >
                    Begin Assessment Now
                </Link>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="mb-2">💰 FinanceRisk AI - Intelligent Financial Risk Assessment</p>
                    <p className="text-gray-400">Powered by Machine Learning & Explainable AI</p>
                </div>
            </footer>
        </div>
    )
}

export default Home