import React from 'react'

const Course = ({courses}) => {
  console.log(courses)
  console.log(courses[0])
  
  return (
    <div>
       {courses.map(course =>
        <h1 key = {course.id}>
          
            <Header head={course.name}/>
         
            <Content parts = {course.parts}/>

            <Total parts = {course.parts}/>
          
        </h1>
      )}

    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <div>
      {props.head}
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      
      {props.part.name} {props.part.exercises}
      
    </div>
  )
}

const Content = ({parts}) => {
  console.log(parts)
 
  return (
    <div>
      {parts.map(part =>
        <div key = {part.id}>
          <Part part = {part}/>
        </div>
      )}
    </div>
  )
}

const Total = ({parts}) => {
  let arrExercises = []
  
  for(let i = 0; i < parts.length; ++i) {
    arrExercises.push(parts[i].exercises)
  }
  

  return (
    
    <div>
      Number of exercises = {arrExercises.reduce((previousVal,currVal) =>
        previousVal + currVal
      )}

    </div>
  )
}

export default Course