import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService
        .setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessageType('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = blogObject => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setMessageType('error')
    setMessage('wrong or missing userId')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addLikes = (id) => {
    const blog = blogs.find((b => b.id === id))
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .addLikes(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id === id ? returnedBlog : b))
      })
  }

  const remove = (id) => {
    const blogToRemove = blogs.find(b => b.id === id)

    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`))
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blogs => blogs.id !== id))
        })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification type={messageType} message={message} />

        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification type={messageType} message={message} />
      <Login user={user} />

      <Togglable buttonShow={'create a new blog'} buttonHide={'cancel'}>
        <BlogForm
          createBlog={addBlog}
          message={setMessage}
          messageType={setMessageType}
        />
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          addLikes={() => addLikes(blog.id)}
          remove={() => remove(blog.id)}
        />
      )}
    </div>
  )
}

export default App