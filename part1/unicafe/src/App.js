import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.name}</button>
}

const Statistics = ({ states, results }) => {
  const stats = states.map(v => 
    <p key={v.name}> {[v.name, v.state].join(" ")}</p>
  )
  const sum = results.reduce((v, acc) => v + acc, 0)
  const pos = results.filter(v => v === 1).length
  return (<div>
    {stats}
    <p>all {results.length} </p>
    <p>average {sum / results.length} </p>
    <p>positive {pos / results.length * 100} %</p>
    </div>)
}

const App = () => {
  const [results, setResults] = useState([])
  // TODO: is there a nicer way to construct the objects?
  const [good, setGood] = useState(0)
  const goodState = { name: "good", state: good, handler: setGood, value: 1 }
  const [bad, setBad] = useState(0)
  const badState = { name: "bad", state: bad, handler: setBad, value: -1 }
  const [neutral, setNeutral] = useState(0)
  const neutralState = { name: "neutral", state: neutral, handler: setNeutral, value: 0 }
  const states = [goodState, badState, neutralState]

  const handleState = (state) => (
    () => {
      state.handler(state.state + 1)
      setResults(results.concat(state.value))
      console.log(results)
    }
  )

  const buttons = states.map(v => <Button key={v.name} name={v.name} onClick={handleState(v)} />)

  // debugger

  return (
    <div>
      <h1>give feedback</h1>
      {buttons}
      <h1>statistics</h1>
      <Statistics states={states} results={results}/>
    </div>
  )
}

export default App