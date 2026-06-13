import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Logout = ({ setUser }) => {
  const navigate = useNavigate()

  const remove = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    navigate('/')
  }

  return (
    <Button color="inherit" onClick={remove} >logout</Button>
  )
}

export default Logout