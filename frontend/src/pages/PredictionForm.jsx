//                             {/* Loan Amount */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Loan Amount ($)</label>
//                                 <input
//                                     type="number"
//                                     name="loan_amnt"
//                                     value={form.loan_amnt}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 />
//                             </div>

//                             {/* Term */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Loan Term</label>
//                                 <select
//                                     name="term"
//                                     value={form.term}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 >
//                                     <option value="36 months">36 months</option>
//                                     <option value="60 months">60 months</option>
//                                 </select>
//                             </div>

//                             {/* Interest Rate */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Interest Rate (%)</label>
//                                 <input
//                                     type="number"
//                                     name="int_rate"
//                                     step="0.1"
//                                     value={form.int_rate}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 />
//                             </div>

//                             {/* Installment */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Monthly Installment ($)</label>
//                                 <input
//                                     type="number"
//                                     name="installment"
//                                     value={form.installment}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 />
//                             </div>

//                             {/* Annual Income */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Annual Income ($)</label>
//                                 <input
//                                     type="number"
//                                     name="annual_inc"
//                                     value={form.annual_inc}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 />
//                             </div>

//                             {/* Employment Length */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Employment Length (years)</label>
//                                 <input
//                                     type="number"
//                                     name="emp_length"
//                                     value={form.emp_length}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 />
//                             </div>

//                             {/* DTI */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Debt-to-Income Ratio (%)</label>
//                                 <input
//                                     type="number"
//                                     name="dti"
//                                     step="0.1"
//                                     value={form.dti}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 />
//                             </div>

//                             {/* Revolving Utilization */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Credit Utilization (%)</label>
//                                 <input
//                                     type="number"
//                                     name="revol_util"
//                                     step="0.1"
//                                     value={form.revol_util}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 />
//                             </div>

//                             {/* Open Accounts */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Open Accounts</label>
//                                 <input
//                                     type="number"
//                                     name="open_acc"
//                                     value={form.open_acc}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 />
//                             </div>

//                             {/* Total Accounts */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Total Accounts</label>
//                                 <input
//                                     type="number"
//                                     name="total_acc"
//                                     value={form.total_acc}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 />
//                             </div>

//                             {/* Public Records */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Public Records</label>
//                                 <input
//                                     type="number"
//                                     name="pub_rec"
//                                     value={form.pub_rec}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 />
//                             </div>

//                             {/* Home Ownership */}
//                             <div>
//                                 <label className="block font-semibold mb-2">Home Ownership</label>
//                                 <select
//                                     name="home_ownership"
//                                     value={form.home_ownership}
//                                     onChange={handleChange}
//                                     className="border p-2 w-full rounded"
//                                 >
//                                     <option value="RENT">Rent</option>
//                                     <option value="OWN">Own</option>
//                                     <option value="MORTGAGE">Mortgage</option>
//                                     <option value="OTHER">Other</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex gap-3 mt-8">
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={loading}
//                                 className="flex-1 bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
//                             >
//                                 {loading ? "Analyzing..." : "Analyze Risk"}
//                             </button>
//                             <button
//                                 onClick={handleAffordabilityCheck}
//                                 disabled={loading}
//                                 className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded hover:bg-indigo-700 disabled:bg-gray-400 font-semibold"
//                             >
//                                 Check Affordability
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Info Sidebar */}
//                 <div>
//                     {/* Affordability Card */}
//                     {showAffordability && affordability && (
//                         <div className="p-4 mb-6 border rounded-lg bg-blue-50 border-blue-200">
//                             <h3 className="text-lg font-semibold text-blue-900 mb-3">💰 Affordability Check</h3>
//                             <div className="space-y-2">
//                                 <div>
//                                     <p className="text-xs text-gray-600">Max Safe Loan</p>
//                                     <p className="text-2xl font-bold text-blue-600">
//                                         ${affordability.max_loan_amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
//                                     </p>
//                                 </div>
//                                 <div className="text-xs text-gray-700 bg-white p-2 rounded">
//                                     {affordability.recommendation}
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Status Card */}
//                     <div className="p-4 border rounded-lg bg-gray-50">
//                         <h3 className="text-lg font-semibold mb-4">Quick Tips</h3>
//                         <ul className="text-sm text-gray-700 space-y-2">
//                             <li>✓ Lower income increases risk</li>
//                             <li>✓ High DTI (&gt 40%) is problematic</li>
//                             <li>✓ High credit utilization (&gt 70%) is risky</li>
//                             <li>✓ Public records negatively impact score</li>
//                             <li>✓ Longer employment = less risk</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             {/* Result Section */}
//             {result && (
//                 <div className="mt-8">
//                     <div id="prediction-result" />
//                 </div>
//             )}
//         </div>
//     );
// }





// import React, { useState } from "react";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
//     PieChart,
//     Pie,
//     Cell
// } from "recharts";

// const LoanPredictionForm = () => {

//     const defaultForm = {
//         loan_amnt: 10000,
//         term: "36 months",
//         int_rate: 10,
//         installment: 300,
//         emp_length: 5,
//         home_ownership: "RENT",
//         annual_inc: 50000,
//         verification_status: "Verified",
//         dti: 15,
//         open_acc: 5,
//         pub_rec: 0,
//         revol_bal: 5000,
//         revol_util: 30,
//         total_acc: 15,
//         mort_acc: 0,
//         pub_rec_bankruptcies: 0
//     };

//     const [form, setForm] = useState(defaultForm);
//     const [result, setResult] = useState(null);
//     const [affordability, setAffordability] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {

//         const { name, value } = e.target;

//         if (
//             name === "term" ||
//             name === "home_ownership" ||
//             name === "verification_status"
//         ) {
//             setForm({ ...form, [name]: value });
//         } else {
//             setForm({ ...form, [name]: parseFloat(value) });
//         }

//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();
//         setLoading(true);
//         setResult(null);

//         try {

//             const res = await fetch("http://localhost:4000/api/predict", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(form)
//             });

//             const data = await res.json();
//             setResult(data);

//         } catch (err) {
//             console.error(err);
//             alert("Prediction failed");
//         }

//         setLoading(false);

//     };

//     const handleAffordability = async () => {

//         setLoading(true);
//         setAffordability(null);

//         try {

//             const res = await fetch("http://localhost:4000/api/affordability-calculator", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(form)
//             });

//             const data = await res.json();
//             setAffordability(data);

//         } catch (err) {
//             console.error(err);
//             alert("Affordability check failed");
//         }

//         setLoading(false);

//     };

//     const loadExample = () => {

//         setForm({
//             loan_amnt: 15000,
//             term: "36 months",
//             int_rate: 12,
//             installment: 450,
//             emp_length: 3,
//             home_ownership: "RENT",
//             annual_inc: 42000,
//             verification_status: "Verified",
//             dti: 22,
//             open_acc: 4,
//             pub_rec: 0,
//             revol_bal: 6000,
//             revol_util: 40,
//             total_acc: 12,
//             mort_acc: 0,
//             pub_rec_bankruptcies: 0
//         });

//     };

//     const clearForm = () => {

//         setForm(defaultForm);
//         setResult(null);
//         setAffordability(null);

//     };


//     const riskChartData = result
//         ? [
//             { name: "Risk Score", value: result.risk_score },
//             { name: "Financial Health", value: result.financial_health_score }
//         ]
//         : [];


//     const affordabilityChartData = affordability
//         ? [
//             {
//                 name: "Monthly Income",
//                 value: affordability.monthly_income
//             },
//             {
//                 name: "Debt Allowed",
//                 value: affordability.max_monthly_debt_allowed
//             },
//             {
//                 name: "Loan Capacity",
//                 value: affordability.available_for_new_loan
//             }
//         ]
//         : [];

//     return (

//         <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded">

//             <h2 className="text-2xl font-bold mb-6 text-center">
//                 Loan Default Risk Prediction
//             </h2>

//             <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

//                 <div>
//                     <label className="font-semibold">Loan Amount</label>
//                     <input
//                         type="number"
//                         name="loan_amnt"
//                         value={form.loan_amnt}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Loan Term</label>
//                     <select
//                         name="term"
//                         value={form.term}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     >
//                         <option value="36 months">36 Months</option>
//                         <option value="60 months">60 Months</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="font-semibold">Interest Rate (%)</label>
//                     <input
//                         type="number"
//                         name="int_rate"
//                         value={form.int_rate}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Installment</label>
//                     <input
//                         type="number"
//                         name="installment"
//                         value={form.installment}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Employment Length</label>
//                     <input
//                         type="number"
//                         name="emp_length"
//                         value={form.emp_length}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Home Ownership</label>
//                     <select
//                         name="home_ownership"
//                         value={form.home_ownership}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     >
//                         <option value="RENT">Rent</option>
//                         <option value="OWN">Own</option>
//                         <option value="MORTGAGE">Mortgage</option>
//                         <option value="OTHER">Other</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="font-semibold">Annual Income</label>
//                     <input
//                         type="number"
//                         name="annual_inc"
//                         value={form.annual_inc}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Verification Status</label>
//                     <select
//                         name="verification_status"
//                         value={form.verification_status}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     >
//                         <option value="Not Verified">Not Verified</option>
//                         <option value="Source Verified">Source Verified</option>
//                         <option value="Verified">Verified</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label className="font-semibold">DTI Ratio</label>
//                     <input
//                         type="number"
//                         name="dti"
//                         value={form.dti}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Open Accounts</label>
//                     <input
//                         type="number"
//                         name="open_acc"
//                         value={form.open_acc}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Public Records</label>
//                     <input
//                         type="number"
//                         name="pub_rec"
//                         value={form.pub_rec}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Revolving Balance</label>
//                     <input
//                         type="number"
//                         name="revol_bal"
//                         value={form.revol_bal}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Revolving Utilization (%)</label>
//                     <input
//                         type="number"
//                         name="revol_util"
//                         value={form.revol_util}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Total Accounts</label>
//                     <input
//                         type="number"
//                         name="total_acc"
//                         value={form.total_acc}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Mortgage Accounts</label>
//                     <input
//                         type="number"
//                         name="mort_acc"
//                         value={form.mort_acc}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="font-semibold">Bankruptcies</label>
//                     <input
//                         type="number"
//                         name="pub_rec_bankruptcies"
//                         value={form.pub_rec_bankruptcies}
//                         onChange={handleChange}
//                         className="border p-2 w-full rounded"
//                     />
//                 </div>

//                 <div className="col-span-2 flex gap-4 mt-4">

//                     <button
//                         type="submit"
//                         className="flex-1 bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
//                     >
//                         {loading ? "Analyzing..." : "Analyze Risk"}
//                     </button>

//                     <button
//                         type="button"
//                         onClick={handleAffordability}
//                         className="flex-1 bg-green-600 text-white p-3 rounded hover:bg-green-700"
//                     >
//                         Check Affordability
//                     </button>

//                 </div>

//                 <div className="col-span-2 flex gap-4">

//                     <button
//                         type="button"
//                         onClick={loadExample}
//                         className="flex-1 bg-yellow-500 text-white p-3 rounded"
//                     >
//                         Load Example Profile
//                     </button>

//                     <button
//                         type="button"
//                         onClick={clearForm}
//                         className="flex-1 bg-gray-500 text-white p-3 rounded"
//                     >
//                         Clear Form
//                     </button>

//                 </div>

//             </form>

//             {/* {result && (

//                 <div className="mt-8 bg-blue-100 p-6 rounded">

//                     <h3 className="text-xl font-bold mb-3">Risk Prediction Result</h3>

//                     <p><b>Prediction:</b> {result.prediction === 1 ? "High Risk" : "Low Risk"}</p>

//                     <p><b>Risk Level:</b> {result.risk_level}</p>

//                     <p><b>Risk Score:</b> {result.risk_score}</p>

//                     <p><b>Financial Health Score:</b> {result.financial_health_score}</p>

//                     <h4 className="mt-4 font-bold">Loan Decision</h4>

//                     <p><b>Decision:</b> {result.approval?.decision}</p>
//                     <span className={`px-3 py-1 rounded text-white ${result.approval?.decision === "Approved"
//                         ? "bg-green-600"
//                         : "bg-red-600"
//                         }`}>
//                         {result.approval?.decision}
//                     </span>

//                     <p><b>Description:</b> {result.approval?.description}</p>

//                     <p><b>Reason:</b> {result.approval?.reason}</p>

//                     <p><b>Threshold:</b> {result.approval?.threshold}</p>

//                 </div>

//             )}

//             {affordability && (

//                 <div className="mt-6 bg-green-100 p-6 rounded">

//                     <h3 className="text-xl font-bold mb-3">Affordability Result</h3>

//                     <p><b>Annual Income:</b> ${affordability.annual_income?.toLocaleString()}</p>

//                     <p><b>Monthly Income:</b> ${affordability.monthly_income?.toFixed(2)}</p>

//                     <p><b>Max Monthly Debt Allowed:</b> ${affordability.max_monthly_debt_allowed?.toFixed(2)}</p>

//                     <p><b>Available For New Loan:</b> ${affordability.available_for_new_loan?.toFixed(2)}</p>

//                     <p><b>Maximum Loan Amount:</b> ${affordability.max_loan_amount?.toFixed(2)}</p>

//                     <p><b>DTI Threshold:</b> {affordability.dti_threshold}%</p>

//                     <p className="mt-3 font-semibold text-green-700">
//                         {affordability.recommendation}
//                     </p>

//                 </div>

//             )} */}



//             {result && (

//                 <div className="mt-8 bg-blue-100 p-6 rounded">

//                     <h3 className="text-xl font-bold mb-3">Risk Prediction Result</h3>

//                     <p><b>Prediction:</b> {result.prediction === 1 ? "High Risk" : "Low Risk"}</p>

//                     <p><b>Risk Level:</b> {result.risk_level}</p>

//                     <p><b>Risk Score:</b> {result.risk_score}</p>

//                     <p><b>Financial Health Score:</b> {result.financial_health_score}</p>

//                     <h4 className="mt-4 font-bold">Loan Decision</h4>

//                     <span className={`px-3 py-1 rounded text-white ${result.approval?.decision === "Approved"
//                         ? "bg-green-600"
//                         : "bg-red-600"
//                         }`}>
//                         {result.approval?.decision}
//                     </span>

//                     <p><b>Description:</b> {result.approval?.description}</p>

//                     <p><b>Reason:</b> {result.approval?.reason}</p>

//                     <p><b>Threshold:</b> {result.approval?.threshold}</p>

//                     {/* Risk Chart */}

//                     <div className="mt-6 h-64">

//                         <ResponsiveContainer width="100%" height="100%">

//                             <BarChart data={riskChartData}>

//                                 <XAxis dataKey="name" />

//                                 <YAxis />

//                                 <Tooltip />

//                                 <Bar dataKey="value" fill="#2563eb" />

//                             </BarChart>

//                         </ResponsiveContainer>

//                     </div>

//                 </div>

//             )}




//             {affordability && (

//                 <div className="mt-6 bg-green-100 p-6 rounded">

//                     <h3 className="text-xl font-bold mb-3">Affordability Result</h3>

//                     <p><b>Annual Income:</b> ${affordability.annual_income?.toLocaleString()}</p>

//                     <p><b>Monthly Income:</b> ${affordability.monthly_income?.toFixed(2)}</p>

//                     <p><b>Max Monthly Debt Allowed:</b> ${affordability.max_monthly_debt_allowed?.toFixed(2)}</p>

//                     <p><b>Available For New Loan:</b> ${affordability.available_for_new_loan?.toFixed(2)}</p>

//                     <p><b>Maximum Loan Amount:</b> ${affordability.max_loan_amount?.toFixed(2)}</p>

//                     <p><b>DTI Threshold:</b> {affordability.dti_threshold}%</p>

//                     <p className="mt-3 font-semibold text-green-700">
//                         {affordability.recommendation}
//                     </p>

//                     {/* Affordability Chart */}

//                     <div className="mt-6 h-64">

//                         <ResponsiveContainer width="100%" height="100%">

//                             <BarChart data={affordabilityChartData}>

//                                 <XAxis dataKey="name" />

//                                 <YAxis />

//                                 <Tooltip />

//                                 <Bar dataKey="value" fill="#16a34a" />

//                             </BarChart>

//                         </ResponsiveContainer>

//                     </div>

//                     {/* Loan Capacity Pie */}

//                     <div className="mt-6 h-64">

//                         <ResponsiveContainer width="100%" height="100%">

//                             <PieChart>

//                                 <Pie
//                                     data={affordabilityChartData}
//                                     dataKey="value"
//                                     nameKey="name"
//                                     outerRadius={90}
//                                     label
//                                 >

//                                     {affordabilityChartData.map((entry, index) => (

//                                         <Cell
//                                             key={index}
//                                             fill={["#22c55e", "#f59e0b", "#3b82f6"][index % 3]}
//                                         />

//                                     ))}

//                                 </Pie>

//                                 <Tooltip />

//                             </PieChart>

//                         </ResponsiveContainer>

//                     </div>

//                 </div>

//             )}

//         </div>

//     );

// };

// export default LoanPredictionForm;













import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import PredictionResult from '../components/PredictionResult';
import FinancialHealthDashboard from '../components/FinancialHealthDashboard';
import WhatIfAnalyzer from '../components/WhatIfAnalyzer';

const LoanPredictionForm = () => {

    const defaultForm = {
        loan_amnt: 10000,
        term: "36 months",
        int_rate: 10,
        installment: 300,
        emp_length: 5,
        home_ownership: "RENT",
        annual_inc: 50000,
        verification_status: "Verified",
        dti: 15,
        open_acc: 5,
        pub_rec: 0,
        revol_bal: 5000,
        revol_util: 30,
        total_acc: 15,
        mort_acc: 0,
        pub_rec_bankruptcies: 0
    };

    const [form, setForm] = useState(defaultForm);
    const [result, setResult] = useState(null);
    const [affordability, setAffordability] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (
            name === "term" ||
            name === "home_ownership" ||
            name === "verification_status"
        ) {
            setForm({ ...form, [name]: value });
        } else {
            setForm({ ...form, [name]: parseFloat(value) });
        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {

            const res = await fetch("http://localhost:4000/api/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            setResult(data);

        } catch (err) {
            console.error(err);
            alert("Prediction failed");
        }

        setLoading(false);

    };

    const handleAffordability = async () => {

        setLoading(true);
        setAffordability(null);

        try {

            const res = await fetch("http://localhost:4000/api/affordability-calculator", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            setAffordability(data);

        } catch (err) {
            console.error(err);
            alert("Affordability check failed");
        }

        setLoading(false);

    };

    const loadExample = () => {

        setForm({
            loan_amnt: 15000,
            term: "36 months",
            int_rate: 12,
            installment: 450,
            emp_length: 3,
            home_ownership: "RENT",
            annual_inc: 42000,
            verification_status: "Verified",
            dti: 22,
            open_acc: 4,
            pub_rec: 0,
            revol_bal: 6000,
            revol_util: 40,
            total_acc: 12,
            mort_acc: 0,
            pub_rec_bankruptcies: 0
        });

    };

    const clearForm = () => {

        setForm(defaultForm);
        setResult(null);
        setAffordability(null);

    };

    const riskChartData = result
        ? [
            { name: "Risk Score", value: result.risk_score },
            { name: "Financial Health", value: result.financial_health_score }
        ]
        : [];

    const affordabilityChartData = affordability
        ? [
            { name: "Monthly Income", value: affordability.monthly_income },
            { name: "Debt Allowed", value: affordability.max_monthly_debt_allowed },
            { name: "Loan Capacity", value: affordability.available_for_new_loan }
        ]
        : [];

    // return (

    //     <div className="min-h-screen bg-gray-100 py-10 px-6">

    //         <div className="max-w-6xl mx-auto">

    //             <h1 className="text-3xl font-bold text-center mb-8">
    //                 Loan Default Risk Prediction System
    //             </h1>

    //             {/* FORM CARD */}

    //             <div className="bg-white shadow-lg rounded-xl p-8 mb-8">

    //                 <h2 className="text-xl font-semibold mb-6">Applicant Information</h2>

    //                 <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-5">

    //                     {Object.keys(form).map((key) => (

    //                         <div key={key} className="flex flex-col">

    //                             <label className="text-sm font-medium mb-1 capitalize">
    //                                 {key.replace(/_/g, " ")}
    //                             </label>

    //                             {key === "term" ? (
    //                                 <select
    //                                     name="term"
    //                                     value={form.term}
    //                                     onChange={handleChange}
    //                                     className="border rounded p-2"
    //                                 >
    //                                     <option>36 months</option>
    //                                     <option>60 months</option>
    //                                 </select>
    //                             ) : key === "home_ownership" ? (
    //                                 <select
    //                                     name="home_ownership"
    //                                     value={form.home_ownership}
    //                                     onChange={handleChange}
    //                                     className="border rounded p-2"
    //                                 >
    //                                     <option value="RENT">Rent</option>
    //                                     <option value="OWN">Own</option>
    //                                     <option value="MORTGAGE">Mortgage</option>
    //                                     <option value="OTHER">Other</option>
    //                                 </select>
    //                             ) : key === "verification_status" ? (
    //                                 <select
    //                                     name="verification_status"
    //                                     value={form.verification_status}
    //                                     onChange={handleChange}
    //                                     className="border rounded p-2"
    //                                 >
    //                                     <option>Not Verified</option>
    //                                     <option>Source Verified</option>
    //                                     <option>Verified</option>
    //                                 </select>
    //                             ) : (
    //                                 <input
    //                                     type="number"
    //                                     name={key}
    //                                     value={form[key]}
    //                                     onChange={handleChange}
    //                                     className="border rounded p-2"
    //                                 />
    //                             )}

    //                         </div>

    //                     ))}

    //                     <div className="md:col-span-3 flex gap-4 mt-6">

    //                         <button
    //                             type="submit"
    //                             className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
    //                         >
    //                             {loading ? "Analyzing..." : "Analyze Risk"}
    //                         </button>

    //                         <button
    //                             type="button"
    //                             onClick={handleAffordability}
    //                             className="flex-1 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
    //                         >
    //                             Check Affordability
    //                         </button>

    //                         <button
    //                             type="button"
    //                             onClick={loadExample}
    //                             className="flex-1 bg-yellow-500 text-white p-3 rounded-lg"
    //                         >
    //                             Example
    //                         </button>

    //                         <button
    //                             type="button"
    //                             onClick={clearForm}
    //                             className="flex-1 bg-gray-500 text-white p-3 rounded-lg"
    //                         >
    //                             Reset
    //                         </button>

    //                     </div>

    //                 </form>

    //             </div>

    //             {/* RESULT SECTION */}

    //             {(result || affordability) && (
    //                 <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
    //                     {/* left column: prediction + affordability */}
    //                     <div className="space-y-6">
    //                         {result && <PredictionResult result={result} />}
    //                         {affordability && (
    //                             <div className="bg-green-50 rounded-xl shadow p-8">
    //                                 <h2 className="text-xl font-bold mb-4">Affordability Analysis</h2>
    //                                 <div className="grid md:grid-cols-2 gap-6">
    //                                     <div>
    //                                         <p><b>Annual Income:</b> ${affordability.annual_income?.toLocaleString()}</p>
    //                                         <p><b>Monthly Income:</b> ${affordability.monthly_income?.toFixed(2)}</p>
    //                                         <p><b>Debt Allowed:</b> ${affordability.max_monthly_debt_allowed?.toFixed(2)}</p>
    //                                         <p><b>Available Loan:</b> ${affordability.available_for_new_loan?.toFixed(2)}</p>
    //                                         <p><b>Max Loan Amount:</b> ${affordability.max_loan_amount?.toFixed(2)}</p>
    //                                         <p className="mt-3 font-semibold text-green-700">
    //                                             {affordability.recommendation}
    //                                         </p>
    //                                     </div>
    //                                     <div className="h-64">
    //                                         <ResponsiveContainer width="100%" height="100%">
    //                                             <PieChart>
    //                                                 <Pie
    //                                                     data={affordabilityChartData}
    //                                                     dataKey="value"
    //                                                     nameKey="name"
    //                                                     outerRadius={90}
    //                                                     label
    //                                                 >
    //                                                     {affordabilityChartData.map((entry, index) => (
    //                                                         <Cell
    //                                                             key={index}
    //                                                             fill={["#22c55e", "#f59e0b", "#3b82f6"][index % 3]}
    //                                                         />
    //                                                     ))}
    //                                                 </Pie>
    //                                                 <Tooltip />
    //                                             </PieChart>
    //                                         </ResponsiveContainer>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         )}
    //                     </div>
    //                     {/* right column: dashboards */}
    //                     <div className="space-y-6">
    //                         {result && <FinancialHealthDashboard userProfile={form} />}
    //                         {result && <WhatIfAnalyzer currentData={form} />}
    //                     </div>
    //                 </div>
    //             )}

    //         </div>

    //     </div>

    // );

    return (

        <div className="h-screen flex bg-gray-100">

            {/* LEFT SIDE - FORM */}

            <div className="w-1/2 overflow-y-auto p-8 bg-white shadow-xl">

                <h1 className="text-2xl font-bold mb-6">
                    Loan Default Risk Prediction
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">

                    {Object.keys(form).map((key) => (

                        <div key={key} className="flex flex-col">

                            <label className="text-sm font-semibold mb-1 capitalize">
                                {key.replace(/_/g, " ")}
                            </label>

                            {key === "term" ? (
                                <select
                                    name="term"
                                    value={form.term}
                                    onChange={handleChange}
                                    className="border rounded p-2"
                                >
                                    <option>36 months</option>
                                    <option>60 months</option>
                                </select>
                            ) : key === "home_ownership" ? (
                                <select
                                    name="home_ownership"
                                    value={form.home_ownership}
                                    onChange={handleChange}
                                    className="border rounded p-2"
                                >
                                    <option value="RENT">Rent</option>
                                    <option value="OWN">Own</option>
                                    <option value="MORTGAGE">Mortgage</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            ) : key === "verification_status" ? (
                                <select
                                    name="verification_status"
                                    value={form.verification_status}
                                    onChange={handleChange}
                                    className="border rounded p-2"
                                >
                                    <option>Not Verified</option>
                                    <option>Source Verified</option>
                                    <option>Verified</option>
                                </select>
                            ) : (
                                <input
                                    type="number"
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    className="border rounded p-2"
                                />
                            )}

                        </div>

                    ))}

                    <div className="flex gap-3 mt-4">

                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                        >
                            {loading ? "Analyzing..." : "Analyze Risk"}
                        </button>

                        <button
                            type="button"
                            onClick={handleAffordability}
                            className="flex-1 bg-green-600 text-white p-3 rounded hover:bg-green-700"
                        >
                            Affordability
                        </button>

                    </div>

                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={loadExample}
                            className="flex-1 bg-yellow-500 text-white p-3 rounded"
                        >
                            Example
                        </button>

                        <button
                            type="button"
                            onClick={clearForm}
                            className="flex-1 bg-gray-500 text-white p-3 rounded"
                        >
                            Reset
                        </button>

                    </div>

                </form>

            </div>


            {/* RIGHT SIDE - VISUALIZATION */}

            <div className="w-1/2 overflow-y-auto p-8 space-y-6">

                {result && <PredictionResult result={result} />}

                {affordability && (

                    <div className="bg-green-50 p-6 rounded shadow">

                        <h2 className="text-xl font-bold mb-4">
                            Affordability Analysis
                        </h2>

                        <div className="grid grid-cols-2 gap-6">

                            <div>

                                <p><b>Annual Income:</b> ${affordability.annual_income?.toLocaleString()}</p>

                                <p><b>Monthly Income:</b> ${affordability.monthly_income?.toFixed(2)}</p>

                                <p><b>Debt Allowed:</b> ${affordability.max_monthly_debt_allowed?.toFixed(2)}</p>

                                <p><b>Loan Capacity:</b> ${affordability.available_for_new_loan?.toFixed(2)}</p>

                            </div>

                            <div className="h-64">

                                <ResponsiveContainer width="100%" height="100%">

                                    <PieChart>

                                        <Pie
                                            data={affordabilityChartData}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={90}
                                            label
                                        >

                                            {affordabilityChartData.map((entry, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={["#22c55e", "#f59e0b", "#3b82f6"][index % 3]}
                                                />

                                            ))}

                                        </Pie>

                                        <Tooltip />

                                    </PieChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    </div>

                )}

                {result && <FinancialHealthDashboard userProfile={form} />}

                {result && <WhatIfAnalyzer currentData={form} />}

            </div>

        </div>

    );
};

export default LoanPredictionForm;