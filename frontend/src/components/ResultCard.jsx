import RiskGauge from "./RiskGauge"

function ResultCard({ result }) {

  return (

    <div className="result">

      <h2>Prediction Result</h2>

      <RiskGauge score={result.risk_score} />

      <p>
        Prediction: <b>{result.prediction}</b>
      </p>

      <p>
        Probability: {result.probability}
      </p>

    </div>

  )

}

export default ResultCard