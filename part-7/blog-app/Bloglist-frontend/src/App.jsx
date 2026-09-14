import { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useBlogActions, useUser, useUserActions } from './store'
import useLocalStorage from './services/persistentUser'
import Blog from './components/Blog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import UserList from './components/UserList'
import User from './components/User'

const App = () => {
  const [ loggedUser ] = useLocalStorage('loggedBlogappUser', null)
  const { initialize } = useBlogActions()
  const { getUser, initializeUsers } = useUserActions()
  const user = useUser()

  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    if (loggedUser) {
      getUser(loggedUser)
    }
  }, [loggedUser, getUser])

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to='/'>blogs</Button>
          <Button color="inherit" component={Link} to='/users'>users</Button>
          {user && <Button color="inherit" component={Link} to='/create'>new blog</Button>}
          {!user && <Button color="inherit" component={Link} to='/login'>login</Button> }
          {user && <Logout /> }
        </Toolbar>
      </AppBar>

      <Notification />

      <Routes>
        <Route path='/blogs/:id' element={
          <Blog
            user={user}
          />
        } />
        <Route path='/' element={
          <ErrorBoundary>
            <BlogList />
          </ErrorBoundary>
        } />
        <Route path='/login' element={
          <LoginForm/>
        } />
        <Route path='/create' element={
          <BlogForm />
        } />
        <Route path='/users' element={
          <UserList />
        } />
        <Route path='/users/:id' element={
          <User />
        } />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </Container>
  )
}

export default App