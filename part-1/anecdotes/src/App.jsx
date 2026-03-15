import { useState } from "react"

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Display = (props) => 
  <div>
    {props.anecdote} <br/> 
    has {props.vote} votes 
  </div>

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing a patient.",
    "The only way to go fast, is to go well."
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleSelected = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length)
    const selected = randomInt
    setSelected(selected)
  }

  const handleVotes = () => {
    const votesCopy = votes
    votesCopy[selected] += 1
    return votesCopy
  }

  const updatedVotes = votes[selected]
  const randomAnecdote = anecdotes[selected]
  const topVotesIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display anecdote={randomAnecdote} vote={updatedVotes} />
      <Button onClick={handleVotes} text="vote" />
      <Button onClick={handleSelected} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Display anecdote={anecdotes[topVotesIndex]} vote={votes[topVotesIndex]} />
    </div>
  )
}

export default App
