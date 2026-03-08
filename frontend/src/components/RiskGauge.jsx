function RiskGauge({ score }) {

  let color = "green"

  if(score > 70) color = "red"
  else if(score > 40) color = "orange"

  return (
    <div className="gauge">

      <h3>Risk Score</h3>

      <div
        style={{
          width:"150px",
          height:"150px",
          borderRadius:"50%",
          border:`10px solid ${color}`,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          fontSize:"30px"
        }}
      >
        {score}
      </div>

    </div>
  )
}

export default RiskGauge