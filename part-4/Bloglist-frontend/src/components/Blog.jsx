import { Link } from 'react-router-dom'
import { Card, Typography, Box, Button } from '@mui/material'

const Blog = ({ blog, addLikes, user, remove }) => {
  //color: 'rgba(128, 128, 128)'
  if (!blog)
    return null

  return (
    <div className='blog' key={blog.id}>
      <Card variant="outlined" style={{ marginTop: 20 }}>
        <Box sx={{ textAlign: 'left', margin: 2, marginLeft: 2 }}>
          <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: 500 }}>
            {blog.title}
          </Typography>
          <Typography varaint="h6" sx={{ marginBottom: 1, color: 'rgba(128, 128, 128)' }}>
            by {blog.author}
          </Typography>
          <Link to={`${blog.url}`}>{blog.url}</Link> <br/>
          <Typography varaint="h6" sx={{ marginTop: 1, marginBottom: 1, color: 'rgba(128, 128, 128)' }}>
            added by {blog.user.name}
          </Typography>
          <Typography>
            {`${blog.likes} likes`} { user &&
              <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => addLikes(blog.id)}>like</Button>
            }
            {user && user.id.toString() === blog.user.id.toString() && (
              <Button variant="outlined" color="error" sx={{ marginLeft: 1 }} onClick={() => remove(blog.id)}>remove</Button> )
            }
          </Typography>
        </Box>
      </Card>
    </div>
  )
}

export default Blog