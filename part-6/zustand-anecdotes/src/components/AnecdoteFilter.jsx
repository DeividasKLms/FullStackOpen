import { useAnecdoteActions } from '../store'

const AnecdoteFilter = () => {
  const { setFilter } = useAnecdoteActions()

  const handleChange = (event) => {
    event.preventDefault()
    const content = event.target.value
    setFilter(content)
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default AnecdoteFilter