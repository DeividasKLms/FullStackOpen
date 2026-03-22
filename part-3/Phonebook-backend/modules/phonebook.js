const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("give password as argument")
    process.exit(1)
}

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

console.log("connecting to", url)
mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log("connected to MongoDB")
    })
    .catch(error => {
        console.log("error connecting to MongoDB", error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}