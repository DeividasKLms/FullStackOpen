import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          <TextField style={{ width: 400 }} size="small"
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder='title'
          />
        </div>
        <div>
          <TextField style={{ marginTop: 15, width: 400 }} size="small"
            type="text"
            value={author}
            onChange={event => setAuthor(event.target.value)}
            placeholder='author'
          />
        </div>
        <div>
          <TextField style={{ marginTop: 15, width: 400 }} size="small"
            type="url"
            value={url}
            onChange={event => setUrl(event.target.value)}
            placeholder='url'
          />
        </div>
        <Button type="submit" variant="contained" style={{ marginTop: 15 }}>
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm