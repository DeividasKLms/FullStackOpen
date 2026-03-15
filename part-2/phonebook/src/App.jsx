import { useState, useEffect } from "react"
import phoneBookService from "./components/services/phonebook"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"  
import Notification from "./components/Notification"

const App = () => {
  const [person, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")
  const [newMessage, setMessage] = useState(null)
  const [type, setType] = useState("success")

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} type={type}/>

      <Filter filter={newFilter} filterHandler={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm
        person={person}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        setType={setType}
      />

      <h3>Numbers</h3>

      <Persons person={person} filter={newFilter} setPersons={setPersons} />

    </div>
  )
}

export default App
