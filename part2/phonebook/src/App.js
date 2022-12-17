import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filterState }) => (
  <div>
    filter shown with: <input value={filterState.val} onChange={filterState.handler} />
  </div>
)

const PersonForm = ({ onSubmit, nameState, numberState }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input
        value={nameState.val}
        onChange={nameState.handler}
      />
    </div>
    <div>number: <input
      value={numberState.val}
      onChange={numberState.handler}
    />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Person = ({ person }) => (
  <li> {person.name} {person.number} </li>
)

const Persons = ({ persons, filterName }) => {
  const personsToShow = filterName
    ? persons.filter(person => person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase()))
    : persons
  return personsToShow.map(person => <Person key={person.id} person={person} />)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [id, setId] = useState(0)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log("setting id to", response.data.length)
        setId(response.data.length+1)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      console.log("setting id to", id+1)
      setId(id + 1)
      console.log("id", id)
      setPersons(persons.concat({ name: newName, number: newNumber, id: id }))
    }
    setNewName('')
    setNewNumber('')
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
      <Persons persons={persons} filterName={newFilter} />
    </div>
  )
}

export default App