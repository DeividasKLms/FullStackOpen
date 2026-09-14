import { TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '../services/persistentUser'
import { useNotificationActions, useUserUsername,
  useUserPassword, useUserActions } from '../store'

const LoginForm = () => {
  const [ loggedUser, setLoggedUser ] = useLocalStorage('loggedBlogappUser', null)
  const { badLoginNotification } = useNotificationActions()
  const { setUsername, setPassword, login } = useUserActions()
  const username = useUserUsername()
  const password = useUserPassword()

  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await login(username, password)
      setLoggedUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      badLoginNotification()
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          <TextField label="username" variant="standard"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField label="password" variant="standard"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 5 }}>
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm