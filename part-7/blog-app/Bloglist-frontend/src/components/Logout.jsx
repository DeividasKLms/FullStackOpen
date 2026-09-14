import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useUserActions } from '../store'
import useLocalStorage from '../services/persistentUser'

const Logout = () => {
  const [ loggedUser, setLoggedUser, removeLoggedUser ] = useLocalStorage('loggedBlogappUser', null)
  const { logout } = useUserActions()
  const navigate = useNavigate()

  const remove = () => {
    removeLoggedUser()
    logout()
    navigate('/')
  }

  return (
    <Button color="inherit" onClick={remove}>logout</Button>
  )
}

export default Logout