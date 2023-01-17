const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password> or as env var PASS')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.q1cog9u.mongodb.net/noteApp?retryWrites=true&w=majority`
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)
mongoose.set('strictQuery', false)

const listPeople = () => {
    console.log("phonebook:")
    Person.find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
}

const addPerson = (name, number) => {
    const person = new Person({
        name: name,
        number: number,
    })
    person.save().then(() => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

const main = () => {
    const name = process.argv[3]
    const number = process.argv[4]

    mongoose.connect(url)
        .then(() => {
            if (name && number) {
                addPerson(name, number)
            } else {
                listPeople()
            }
        })
}
main()