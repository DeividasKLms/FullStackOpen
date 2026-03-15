const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(express.json())

morgan.token("body", request => { 
    if (request.method === "POST") {
        return JSON.stringify(request.body)
    } else {
        return ""
    }   
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

let phoneNumbers = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Lovelace",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

const generateId = () => {
    return String(Math.floor(Math.random() * 1000))
}

app.get("/", (request, response) => {
    response.send("<h1>Phonebook</h1>")
})

app.get("/api/persons", (request, response) => {
    response.json(phoneNumbers)
})

app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has info for ${phoneNumbers.length} people </br>
    ${new Date()}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
    id = request.params.id
    number = phoneNumbers.find(number => id === number.id)

    if (number) {
        response.json(number)
    } else {
        response.status(404).end()
    }
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    const copy = phoneNumbers.find(p => p.name === body.name)

    if (!body.name) {
        return response.status(400).json({
            error: "name is missing"
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "number is missing"
        })
    }

    if (copy)
        return response.status(400).json({
            error: "name must be unique"
        })

    const number = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    phoneNumbers = phoneNumbers.concat(number)

    response.json(phoneNumbers)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    phoneNumbers = phoneNumbers.filter(number => number.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

