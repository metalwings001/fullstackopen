import React from 'react'

const Course = ({course}) => {
  //console.log(course)
  return (
    <div>
      <h1><Header head={course.name}/></h1>
      
      <Content parts = {course.parts}/>

      <Total parts = {course.parts}/>
    </div>
  )
}

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
      
      {props.part.name} {props.part.exercises}
      
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part = {props.parts[0]}/>
      <Part part = {props.parts[1]} />
      <Part part = {props.parts[2]} />
      
    </div>
  )
}

const Total = ({parts}) => {
  let arrExercises = []
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  for(let i = 0; i < parts.length; ++i) {
    arrExercises.push(parts[i].exercises)
  }
  //<!-- Number of exercises = { arrExercises.reduce(reducer)} -->

  return (
    
    <div>
      Number of exercises = {arrExercises.reduce((previousVal,currVal) =>
        previousVal + currVal
      )}

    </div>
  )
}

/*const Total = (props) => {

  return (
    
    <div>
      {console.log(props)}
      
      Number of exercises = {parseInt(props.parts[0].exercises)+
      parseInt(props.parts[1].exercises)+parseInt(props.parts[2].exercises)}
    </div>
  )
}*/

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App