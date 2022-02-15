import React, { useState } from 'react'
var noFeedback = true;

const Button = (props) => {
  return(
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
  )
}

const Statline = (props) => {
  console.log(props)
  if(props.all === 0 && noFeedback == true) {
    return (
      <div>
        {noFeedback = false}
        No feedback given
      </div>
    )
  }
  if(props.all != 0) {
    return (
       <table>
         <tr>
            <td>{props.text}</td> <td>{props.val}</td>
          </tr>
        </table>
    
    )
  }
  return (<p></p>)
}

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const allScore = good + neutral + bad

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }
  return (
    <div>
      <Header text = "give feedback"/>
      <Button handleClick = {handleGood} text = "good"/ >
      <Button handleClick = {handleNeutral} text = "neutral"/>
      <Button handleClick = {handleBad} text = "bad" />
      <Statline text = "good" val = {good} all = {all}/>
      <Statline text = "neutral" val = {neutral} all = {all}/>
      <Statline text = "bad" val = {bad}  all = {all}/>
      <Statline text = "all" val = {allScore}  all = {all}/>
      <Statline text = "average" val = {(good - bad) / allScore}  all = {all} />
      <Statline text = "positive" val = {(good / all)*100}  all = {all}/>
    </div>
  )
}

export default App