import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useBlogActions, useNotificationActions } from '../store'
import useBlogStore from '../store'

const BlogForm = () => {
  const { addBlogNotification, badBlogNotification } = useNotificationActions()
  const { add, setTitle, setAuthor, setUrl } = useBlogActions()
  const { title, author, url } = useBlogStore()

  const navigate = useNavigate()

  const addBlog = async (event) => {
    try {
      event.preventDefault()
      await add({
        title: title,
        author: author,
        url: url
      })
      await addBlogNotification(title, author)

      setTitle('')
      setAuthor('')
      setUrl('')
      navigate('/')
    } catch {
      await badBlogNotification()
    }
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