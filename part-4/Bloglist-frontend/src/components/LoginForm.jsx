import { TextField, Button } from '@mui/material'

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin
}) => {

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