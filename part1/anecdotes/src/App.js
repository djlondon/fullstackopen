import { useState } from 'react'


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const scores = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(scores)

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  const handleNext = () => setSelected(getRandomInt(anecdotes.length - 1))
  const mostVotes = anecdotes[votes.indexOf(Math.max(...votes))]

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleNext} text="next anecdote" />
      <Button onClick={handleVote} text="vote" />
      <h1>Anecdote with most votes</h1>
      {mostVotes}
    </div>
  )
}

export default App