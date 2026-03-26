import phoneBookService from './services/phonebook'

const PersonForm = (props) => {
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: props.newName,
      number: String(props.newNumber)
    }

    if (props.person.some(persons => (persons.name === personObject.name))) {
      const preUpdate = props.person.find(p => p.name === personObject.name)
      const updatePersonNumber = { ...preUpdate, number: String(props.newNumber) }

      const confirm = window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)

      if (confirm) {
        phoneBookService
          .update(preUpdate.id, updatePersonNumber)
          .then(updatedPersons => {
            props.setPersons(props.person.map(p => p.id === preUpdate.id ? updatedPersons : p))
            props.setType('success')
            props.setMessage(`${props.newName} added`)
            setTimeout(() => {
              props.setMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error.response.data.error)
            props.setType('error')
            props.setMessage(error.response.data.error)
            setTimeout(() => {
              props.setMessage(null)
            }, 5000)
          })
      }
      return
    }

    phoneBookService
      .create(personObject)
      .then(returnedPersons => {
        props.setPersons(props.person.concat(returnedPersons))
        props.setNewName('')
        props.setNewNumber('')
        props.setType('success')
        props.setMessage(`${props.newName} added`)
        setTimeout(() => {
          props.setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        props.setType('error')
        props.setMessage(error.response.data.error)
        setTimeout(() => {
          props.setMessage(null)
        }, 5000)
      })
    return
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={props.newName}
          onChange={props.handlePersonChange}
        />
      </div>
      <div>
        number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div> <button type="submit">add</button> </div>
    </form>
  )
}

export default PersonForm