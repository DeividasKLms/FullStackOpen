import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { useUsers } from '../store'

const User = () => {
  const { id } = useParams()
  const users = useUsers()
  const user = users.find(b => b.id === id)

  if (!user)
    return null

  return (
    <div>
      <Typography variant="h1" sx={{ fontSize: 30, lineHeight: '70px', minWidth: 300, minHeight: 40 }}>
        {user.name}
      </Typography>
      <Typography variant="h2" sx={{ fontSize: 23, lineHeight: '30px', minWidth: 300, minHeight: 40 }}>
        added blogs
      </Typography>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

export default User