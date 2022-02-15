import React, { useState } from 'react'

const Button = (props) => {
  return ( 
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
  )
}
const FindMostVoted = ({anecdotes,vote}) => {
  const highestVoteCount = Math.max(...vote)
  const winnerIndex = vote.indexOf(highestVoteCount)
  const winner = anecdotes[winnerIndex]
  console.log(vote)

  return (
    <div>
      <p>{winner}</p
      <p>has {highestVoteCount} votes</p>
    </div>
    
  )
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(7).fill(0))
  const [max, setMax] = useState(0);
  


  const handleSelected = () => {
    setSelected(Math.floor(Math.random() * 7))
  }
  const handleVote = () => {
    const copyVotes = [...vote]
    copyVotes[selected] += 1
    setVote(copyVotes)
  }
  
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br></br>
      <Button handleClick = {handleSelected} text = "next anecdote"/>
      <Button handleClick = {handleVote} text = "vote" />
      {vote[selected]}
      <br></br>
      <h2>Most voted anecdote</h2>
      <FindMostVoted anecdotes = {anecdotes} vote = {vote} />
      
      
    </div>
  )
}

export default App
