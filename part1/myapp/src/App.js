import React from 'react'

const Header = (props) => {
  return (
    <div>
      {props.head}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      
      {props.part.name} {props.part.ex}
      
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {console.log(props)}
      <Part part = {props.parts[0]}/>
      <Part part = {props.parts[1]} />
      <Part part = {props.parts[2]} />
      
    </div>
  )
}

const Total = (props) => {

  return (
    
    <div>
      {console.log(props)}
      
      Number of exercises = {parseInt(props.parts[0].ex)+
      parseInt(props.parts[1].ex)+parseInt(props.parts[2].ex)}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    
  {
    name: 'Fundamentals of React',
    ex: 10
  },
  {
    name: 'Using props to pass data',
    ex: 7
  },
  {
    name: 'State of a component',
    ex: '14'
  }
]
}
 
  return (
    <div>
      <h1><Header head={course.name}/></h1>
      
      <Content parts = {course.parts}/>

      <Total parts = {course.parts}/>
    </div>
  )
}

export default App