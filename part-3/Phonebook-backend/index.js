require("dotenv").config()
const express = require("express")
const Person = require("./models/phonebook")
const morgan = require("morgan") 

const app = express()

morgan.token("body", (request) => JSON.stringify(request.body))
app.use(express.static("dist"))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.get("/", (request, response) => {
    response.send("<h1>Phonebook</h1>")
})

app.get("/api/persons", (request, response) => {
    Person.find({}).then(notes => {
        response.json(notes)
    })
})

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then(persons => {
            if (persons) {
                response.json(persons)
            } else {
                response.status(404).end()
            }
    })
    .catch(error => next(error))
})

app.get("/info", (request, response) => {
    Person.find({}).then(persons => {
        response.send(`Phonebook has info for ${persons.length} people </br>
        ${Date()}`)
    })
})

app.post("/api/persons", (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then(persons => {
            if (!persons) {
                return response.status(404).end()
            }

            persons.name = name
            persons.number = number

            return persons.save().then((updatedPersons) => {
                response.json(updatedPersons)
            })
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id"})
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

app.use(errorHandler)