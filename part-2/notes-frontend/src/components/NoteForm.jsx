import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from './Styles'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')
  const navigate = useNavigate()

  const addNote = event => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    navigate('/notes')
    setNewNote('')
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <Input
          label="note content"
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
        />
        <Button type="submit">save</Button>
      </form>
    </div>
  )
}

export default NoteForm