import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-white">💰 FinanceRisk AI</h1>
                </Link>

                <div className="flex gap-6 items-center">
                    <Link
                        to="/"
                        className="text-white hover:text-blue-100 transition font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        to="/predict"
                        className="text-white hover:text-blue-100 transition font-medium"
                    >
                        Risk Assessment
                    </Link>
                    <Link
                        to="/dashboard"
                        className="text-white hover:text-blue-100 transition font-medium"
                    >
                        Analytics
                    </Link>
                    <a
                        href="#features"
                        className="text-white hover:text-blue-100 transition font-medium"
                    >
                        Features
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar