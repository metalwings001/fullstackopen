import { useState,useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import ReactDOM from 'react-dom';

const Persons = ({peopleToShow, setPersons,persons}) => {
 
  const deletePerson = (name) => {
    console.log(name)
    if(window.confirm("Do you really want to delete person?")) {
      const target = peopleToShow.filter(person => name === person.name)
      console.log(target[0].id)
      personService
        .deletePer(target[0].id)
    }
    personService //update after delete request
      .getAll()
      .then(response => {
        console.log('setPerson after delete')
        setPersons(response.data)
    })
  }

  return (
    <div>
      {peopleToShow.map(person =>
        <div key = {person.name}>
          {person.name} &nbsp;
          {person.number}
          <button type ="submit" value = {person.name} onClick = {() => deletePerson(person.name)}> Delete Person</button>
        </div>
      )}
    </div>
  )
}


const PersonForm = ({persons,newName, handleNameChange, handleNumberChange,addPerson, newNumber}) => {

  return (
    <div>
      <form>
        <div>
          name: <input value = {newName} onChange = {handleNameChange}/>
        </div>
        <div>number: <input value = {newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button onClick={addPerson}
          type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = ({persons,handleFilterChange,newFilter,peopleToShow, setNewFilter}) => {
  
  return (
    <div>
       Filter: 
      <input value = {newFilter} onChange = {handleFilterChange}/>
      
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
 
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

 
  const addPerson = (event) => {
    console.log(persons)
    event.preventDefault()

    let names = persons.map(person => person.name)
    console.log("names: ", names)

    if(!names.includes(newName)) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          console.log(response)
          console.log(response.data)
          setPersons(persons.concat(response.data))
        })
    }
    else {
      const getName = persons.filter(person => person.name === newName)
      console.log(getName[0].name,getName[0].number)
      if(getName[0].number !== newNumber) {
        if(window.confirm(`${getName[0].name} is already added to the phonebook, replace the old number with a new one?`)) {
          const personObject = {
            name: getName[0].name,
            number: newNumber
          }
          personService
            .update(getName[0].id,personObject)
          personService
            .getAll()
            .then(response => {
              console.log('setPerson after update same name diff num')
              setPersons(response.data)

          })
        }
      }
    }
  }
  
  

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  
  const peopleToShow = !newFilter ? persons : persons.filter(person => (
    person.name.toLowerCase().includes(newFilter) || person.name.includes(newFilter)
    ))
  
  return (
    <div>
      <h2>Phonebook</h2> 
      
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange} 
      peopleToShow = {peopleToShow} persons = {persons} setNewFilter={setNewFilter}/>
      <PersonForm persons = {persons} newName = {newName} handleNameChange = {handleNameChange}
      handleNumberChange = {handleNumberChange} addPerson = {addPerson} newNumber = {newNumber}   />
      
      <h2>Numbers</h2>
      
      newFilter: {newFilter}
      
      <Persons peopleToShow = {peopleToShow} setPersons = {setPersons} persons = {persons}/>
    </div>
    
  )
}

export default App