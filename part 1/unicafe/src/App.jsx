import { useState } from "react"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
  const StatisticsLine = ({ text, value }) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }

  const All = props.good + props.neutral + props.bad
  const Average = (props.good - props.bad) / All
  const Positive = (props.good / All) * 100

  if (All === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={All} />
      <StatisticsLine text="average" value={Average} />
      <StatisticsLine text="positive" value={Positive} />
    </div>
  )
}
 
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log("Good before", good)
    const updatedGood = good + 1
    console.log("Good after", updatedGood)
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    console.log("Neutral before", neutral)
    const updatedNeutral = neutral + 1
    console.log("Neutral after", updatedNeutral)
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    console.log("Bad before", bad)
    const updatedBad = bad + 1
    console.log("Bad after", updatedBad)
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App