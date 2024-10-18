import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ name, number, id }) => <div>{name} {number} <button onClick={(event) => {
  if(window.confirm(`Delete ${name}?`)) {
    personService.remove(id)
  .catch(error => {
    setErrorMessage(`Information of ${name} has already been removed from server`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  })
  }}}>delete</button></div>

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} id={person.id}/>
      )}
    </div>
  )
}

const PersonForm = ({ persons, addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      if (persons.some(person => person.name === newName)) {
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.find(person => person.name === newName)
          const changedPerson = { ...person, number: newNumber }
          personService.update(person.id, changedPerson)
        }
      } else {
        addPerson();
      }
    }}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.includes('Added')) {
    return (
      <div style={{
        color: 'green',
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16
      }}>
        {message}
      </div>)
  } else {
  return (
    <div style={{
      color: 'green',
      background: 'lightgrey',
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      fontSize: 16
    }}>
      {message}
    </div>
  )
}}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  })

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilterChange={(event) => setFilter(event.target.value)} />
      <h2>add a new</h2>
      <PersonForm persons={persons}
      addPerson={(event) => {
        const personObject = {
          name: newName,
          number: newNumber
        }
        setPersons(persons.concat(personObject))
        personService.create(personObject)
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      }} newName={newName} handleNameChange={(event) => setNewName(event.target.value)} newNumber={newNumber} handleNumberChange={(event) => setNewNumber(event.target.value)} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )

}

export default App