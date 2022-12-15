import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [id, setId] = useState(5)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      setId(id + 1)
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