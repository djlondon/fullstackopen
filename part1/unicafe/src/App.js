import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.name}</button>
}

const Statistics = ({ states }) => {
  const stats = states.map(v => 
    <p key={v.name}> {[v.name, v.state].join(" ")}</p>
  )
  return <div>{stats}</div>
}

const App = () => {
  // TODO: is there a nicer way to construct the objects?
  const [good, setGood] = useState(0)
  const goodState = { name: "good", state: good, handler: setGood }
  const [bad, setBad] = useState(0)
  const badState = { name: "bad", state: bad, handler: setBad }
  const [neutral, setNeutral] = useState(0)
  const neutralState = { name: "neutral", state: neutral, handler: setNeutral }
  const states = [goodState, badState, neutralState]

  const handleState = (state, handler) => (() => handler(state + 1))
  const buttons = states.map(v => <Button key={v.name} name={v.name} onClick={handleState(v.state, v.handler)} />)

  // debugger

  return (
    <div>
      <h1>give feedback</h1>
      {buttons}
      <h1>statistics</h1>
      <Statistics states={states} />
    </div>
  )
}

export default App