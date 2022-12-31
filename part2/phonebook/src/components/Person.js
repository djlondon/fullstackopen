const Person = ({ person, deleteMethod }) => (
    <li> {person.name} {person.number} <button onClick={() => deleteMethod(person.id)}>delete</button></li>
)

export const Persons = ({ persons, filterName, deleteMethod }) => {
    const personsToShow = filterName
        ? persons.filter(person => person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase()))
        : persons
    return personsToShow.map(person => <Person key={person.id} person={person} deleteMethod={deleteMethod}/>)
}

export const PersonForm = ({ onSubmit, nameState, numberState }) => (
    <form onSubmit={onSubmit}>
        <div>
            name: <input
                value={nameState.val}
                onChange={nameState.handler} />
        </div>
        <div>number: <input
            value={numberState.val}
            onChange={numberState.handler} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)
