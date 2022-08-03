import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import React from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [addMessage, setAddMessage] = useState(null)

  const addName = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personid = persons.find(person => person.name === newName).id
        personService
          .update(personid, {name: newName, number: newNumber, id: personid})
          .then(() => setPersons(persons.map(person => person.name !== newName ? person : {name: newName, number: newNumber, id: personid})))
          .catch((error) => {
            setAddMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setAddMessage(null)
            }, 5000)
          })
        
      }
      return
    }
    
    personService
      .create({name: newName, number: newNumber})
      .then(returnedNote => {
        console.log(returnedNote)
        setPersons(persons.concat(returnedNote))
        setAddMessage(`Added ${returnedNote.name}`)
        setTimeout(() => {
          setAddMessage(null)
        }, 5000)
      })

    //setPersons(persons.concat({name: newName, number: newNumber}))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initalNotes => {
        console.log('promise fulfilled')
        setPersons(initalNotes)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} className="new-message" />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personList={persons} setPersons={setPersons} newFilter={newFilter} />
    </div>
  )
}

export default App