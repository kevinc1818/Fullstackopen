import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td> <td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <Header text="statistics" />
        <p>No feedback given</p>
      </>
    )

  } else {
      return (
      <>
        <Header text="statistics" />
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={Math.round(10 * (good - bad) / (good + neutral + bad)) / 10} />
          <StatisticLine text="positive" value={Math.round(1000 * good/(good + neutral + bad))/10 + " %"} />
        </table>
      </>
    )
  }
  
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={goodClick} />
      <Button text="neutral" handleClick={neutralClick} />
      <Button text="bad" handleClick={badClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App