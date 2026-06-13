import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material'
import Blog from './components/Blog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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

  const navigate = useNavigate()

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
      navigate('/')
    } catch {
      setNotification({ text: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addBlog = blogObject => {
    try {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNotification({ text: `a new blog ${blogObject.title} by ${blogObject.author} added`, type: 'success' })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
      navigate('/')
    } catch {
      setNotification({ text: 'wrong or missing userId', type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addLikes = (id) => {
    const blog = blogs.find((b => b.id === id))
    console.log(blog)
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
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter(blogs => blogs.id !== id))
      })
    navigate('/')
  }

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to='/'>blogs</Button>
          {user && <Button color="inherit" component={Link} to='/create'>new blog</Button>}
          {!user && <Button color="inherit" component={Link} to='/login'>login</Button> }
          {user && <Logout setUser={setUser}/> }
        </Toolbar>
      </AppBar>

      <Notification notification={notification} />

      <Routes>
        <Route path='/blogs/:id' element={
          <Blog
            blog={blog}
            addLikes={addLikes}
            user={user}
            remove={remove}
          />
        } />
        <Route path='/' element={<BlogList blogs={blogs} />} />
        <Route path='/login' element={
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        } />
        <Route path='/create' element={
          <BlogForm createBlog={addBlog} />
        } />
      </Routes>
    </Container>
  )
}

export default App