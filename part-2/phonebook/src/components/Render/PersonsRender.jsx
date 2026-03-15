const PersonsRender = ({ persons, remove }) => {
    return (
        <div>{persons.name} {persons.number} <button onClick={remove}> delete</button> </div>
    )
} 

export default PersonsRender