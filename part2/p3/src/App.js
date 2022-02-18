import { useState,useEffect } from 'react'
import axios from 'axios'

const Persons = ({persons}) => {

  return (
    <div>
      {persons.map(person =>
        <div key = {person.name}>
          {person.name} &nbsp;
          {person.number}
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
    axios
      .get('http://localhost:3001/persons')
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
      setPersons(persons.concat(personObject))
    }
  }
  let names = persons.map(person => person.name)

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
      
      <Persons persons = {peopleToShow}/>
    </div>
    
  )
}

export default App