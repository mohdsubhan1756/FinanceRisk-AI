// import { useState } from "react"
// import { predictRisk } from "../services/api"
// import ResultCard from "./ResultCard"

// function LoanForm(){

// const [formData,setFormData]=useState({
// loan_amnt:"",
// term:"",
// int_rate:"",
// installment:"",
// emp_length:"",
// home_ownership:"",
// annual_inc:"",
// verification_status:"",
// dti:"",
// open_acc:"",
// pub_rec:"",
// revol_bal:"",
// revol_util:"",
// total_acc:"",
// mort_acc:"",
// pub_rec_bankruptcies:""
// })

// const [result,setResult]=useState(null)

// const handleChange=(e)=>{
// setFormData({
// ...formData,
// [e.target.name]:e.target.value
// })
// }

// const handleSubmit=async(e)=>{
// e.preventDefault()

// try{

// const res=await predictRisk(formData)

// setResult(res.data)

// }catch(err){
// console.log(err)
// }

// }

// return(

// <div className="loan-form">

// <h2>Loan Risk Prediction</h2>

// <form onSubmit={handleSubmit}>

// <input name="loan_amnt" placeholder="Loan Amount" onChange={handleChange}/>
// <input name="term" placeholder="Term" onChange={handleChange}/>
// <input name="int_rate" placeholder="Interest Rate" onChange={handleChange}/>
// <input name="installment" placeholder="Installment" onChange={handleChange}/>
// <input name="emp_length" placeholder="Employment Length" onChange={handleChange}/>
// <input name="home_ownership" placeholder="Home Ownership" onChange={handleChange}/>
// <input name="annual_inc" placeholder="Annual Income" onChange={handleChange}/>
// <input name="verification_status" placeholder="Verification Status" onChange={handleChange}/>
// <input name="dti" placeholder="DTI" onChange={handleChange}/>
// <input name="open_acc" placeholder="Open Accounts" onChange={handleChange}/>
// <input name="pub_rec" placeholder="Public Records" onChange={handleChange}/>
// <input name="revol_bal" placeholder="Revolving Balance" onChange={handleChange}/>
// <input name="revol_util" placeholder="Revolving Utilization" onChange={handleChange}/>
// <input name="total_acc" placeholder="Total Accounts" onChange={handleChange}/>
// <input name="mort_acc" placeholder="Mortgage Accounts" onChange={handleChange}/>
// <input name="pub_rec_bankruptcies" placeholder="Bankruptcies" onChange={handleChange}/>

// <button type="submit">
// Predict Risk
// </button>

// </form>

// {result && <ResultCard result={result}/>}

// </div>

// )

// }

// export default LoanForm




import React, { useState } from "react"
import { predictRisk } from "../services/api"

export default function LoanForm({ setResult }) {

    const [form, setForm] = useState({
        loan_amnt: 10000,
        term: "36 months",
        int_rate: 12,
        installment: 300,
        emp_length: 5,
        home_ownership: "RENT",
        annual_inc: 40000,
        verification_status: "Verified",
        dti: 15,
        open_acc: 5,
        pub_rec: 0,
        revol_bal: 10000,
        revol_util: 50,
        total_acc: 15,
        mort_acc: 0,
        pub_rec_bankruptcies: 0
    })

    const handleChange = (e) => {
        const { name, value, type } = e.target

        setForm({
            ...form,
            [name]: type === "number" ? Number(value) : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const result = await predictRisk(form)

        setResult(result)
    }

    return (

        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">

            <h2 className="text-2xl font-bold mb-4">Loan Risk Prediction</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                {/* Loan Amount */}
                <div>
                    <label className="text-sm font-medium">Loan Amount</label>
                    <input
                        type="number"
                        name="loan_amnt"
                        value={form.loan_amnt}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Term */}
                <div>
                    <label className="text-sm font-medium">Term</label>
                    <select
                        name="term"
                        value={form.term}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    >
                        <option>36 months</option>
                        <option>60 months</option>
                    </select>
                </div>

                {/* Interest Rate */}
                <div>
                    <label className="text-sm font-medium">Interest Rate</label>
                    <input
                        type="number"
                        step="0.1"
                        name="int_rate"
                        value={form.int_rate}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Installment */}
                <div>
                    <label className="text-sm font-medium">Installment</label>
                    <input
                        type="number"
                        name="installment"
                        value={form.installment}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Employment Length */}
                <div>
                    <label className="text-sm font-medium">Employment Length (years)</label>
                    <input
                        type="number"
                        name="emp_length"
                        value={form.emp_length}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Home Ownership */}
                <div>
                    <label className="text-sm font-medium">Home Ownership</label>
                    <select
                        name="home_ownership"
                        value={form.home_ownership}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    >
                        <option>RENT</option>
                        <option>MORTGAGE</option>
                        <option>OWN</option>
                        <option>OTHER</option>
                    </select>
                </div>

                {/* Annual Income */}
                <div>
                    <label className="text-sm font-medium">Annual Income</label>
                    <input
                        type="number"
                        name="annual_inc"
                        value={form.annual_inc}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Verification Status */}
                <div>
                    <label className="text-sm font-medium">Verification Status</label>
                    <select
                        name="verification_status"
                        value={form.verification_status}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    >
                        <option>Verified</option>
                        <option>Source Verified</option>
                        <option>Not Verified</option>
                    </select>
                </div>

                {/* DTI */}
                <div>
                    <label className="text-sm font-medium">Debt To Income (DTI)</label>
                    <input
                        type="number"
                        step="0.1"
                        name="dti"
                        value={form.dti}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Open Accounts */}
                <div>
                    <label className="text-sm font-medium">Open Accounts</label>
                    <input
                        type="number"
                        name="open_acc"
                        value={form.open_acc}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Public Records */}
                <div>
                    <label className="text-sm font-medium">Public Records</label>
                    <input
                        type="number"
                        name="pub_rec"
                        value={form.pub_rec}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Revolving Balance */}
                <div>
                    <label className="text-sm font-medium">Revolving Balance</label>
                    <input
                        type="number"
                        name="revol_bal"
                        value={form.revol_bal}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Revolving Utilization */}
                <div>
                    <label className="text-sm font-medium">Credit Utilization (%)</label>
                    <input
                        type="number"
                        step="0.1"
                        name="revol_util"
                        value={form.revol_util}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Total Accounts */}
                <div>
                    <label className="text-sm font-medium">Total Accounts</label>
                    <input
                        type="number"
                        name="total_acc"
                        value={form.total_acc}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Mortgage Accounts */}
                <div>
                    <label className="text-sm font-medium">Mortgage Accounts</label>
                    <input
                        type="number"
                        name="mort_acc"
                        value={form.mort_acc}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                {/* Bankruptcies */}
                <div>
                    <label className="text-sm font-medium">Bankruptcies</label>
                    <input
                        type="number"
                        name="pub_rec_bankruptcies"
                        value={form.pub_rec_bankruptcies}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="col-span-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                    Predict Risk
                </button>

            </form>

        </div>

    )

}