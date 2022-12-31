import { useState, useEffect } from 'react'
import personService from './services/persons'
import { PersonForm, Persons } from './components/Person'

const Filter = ({ filterState }) => (
  <div>
    filter shown with: <input value={filterState.val} onChange={filterState.handler} />
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(ns => {
        setPersons(ns)
      })
      .catch(error => {
        console.log('fail')
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.filter(person => person.name === newName)[0]
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already in the phonebook, would you like to update the number to ${newNumber}`)) {
        personService.update(existingPerson.id, { ...existingPerson, number: newNumber })
        .then((returnedPerson) => {
          setPersons(persons.map(n => n.id !== existingPerson.id ? n : returnedPerson))
        })
      }
    } else {
      personService.create({ name: newName, number: newNumber })
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')

  }
  const deletePerson = (id) => {
    if (window.confirm(`Do you really want to delete ${persons.filter(n => n.id === id)[0].name}?`)) {
      personService.remove(id)
        .then((returnedNote) => {
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const nameState = { val: newName, handler: (event) => setNewName(event.target.value) }
  const numberState = { val: newNumber, handler: (event) => setNewNumber(event.target.value) }
  const filterState = { val: newFilter, handler: (event) => setNewFilter(event.target.value) }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterState={filterState} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson} nameState={nameState} numberState={numberState} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={newFilter} deleteMethod={deletePerson} />
    </div>
  )
}

export default App