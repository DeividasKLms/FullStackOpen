import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'
import { useAnecdotes } from '../hooks/useAnecdotes'

const CreateNew = () => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('url')
  const navigate = useNavigate()
  const { addAnecdote } = useAnecdotes()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ 
      content: content.inputFields.value,
      author: author.inputFields.value,
      info: info.inputFields.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputFields}/>
        </div>
        <div>
          author
          <input {...author.inputFields}/>
        </div>
        <div>
          url for more info
          <input {...info.inputFields}/>
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
