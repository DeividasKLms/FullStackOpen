import PersonsRender from "./Render/PersonsRender"
import phoneBookService from "./services/phonebook"

const Persons = ({ person, filter, setPersons }) => {
    const phoneBookFilter = person.map(persons => persons.name.includes(filter))
    ? person.filter(persons => persons.name.toLowerCase().includes(filter.toLowerCase()))
    : person

    const remove = (id) => {
        const contact = person.find(p => p.id === id)

        if (window.confirm(`delete ${contact.name} ?`))
            phoneBookService
                .remove(id)
                .then(removedPerson => {
                    setPersons(person.map(persons => persons.id === id ? removedPerson : persons))
                })
    }

    return (
        <div>
            {phoneBookFilter.map(persons => 
                <PersonsRender 
                key={persons.id} 
                persons={persons} 
                remove={() => remove(persons.id)}
                />
            )}
        </div>
    )
}

export default Persons