import { Link, useParams, useNavigate } from 'react-router-dom'
import { Card, Typography, Box, Button, TextField,
  TableContainer, Table, TableCell, TableBody, Paper,
  TableRow } from '@mui/material'
import { useBlogActions, useBlogs } from '../store'
import useBlogStore from '../store'

const Blog = ({ user }) => {
  const { id } = useParams()
  const { like, remove, addComment, setComment } = useBlogActions()
  const { comment } = useBlogStore()
  const blogs = useBlogs()
  const blog = blogs.find(b => b.id === id)

  const navigate = useNavigate()

  const removeBlog = (id) => {
    remove(id)
    navigate('/')
  }

  const sendComment = async (event) => {
    event.preventDefault()
    await addComment(id, { comment: comment })
    await setComment('')
  }

  if (!blog)
    return null

  return (
    <div className='blog' key={blog.id}>
      <Card variant="outlined" style={{ marginTop: 20 }}>
        <Box sx={{ textAlign: 'left', margin: 2, marginLeft: 2 }}>
          <Typography variant="h1" sx={{ fontSize: 30, marginBottom: 1 }}>
            {blog.title}
          </Typography>
          <Typography variant="h3" sx={{ fontSize: 18, marginBottom: 1, color: 'rgba(128, 128, 128)' }}>
            by {blog.author}
          </Typography>
          <Link to={`${blog.url}`}>{blog.url}</Link> <br/>
          <Typography varaint="h1" sx={{ marginTop: 1, marginBottom: 1, color: 'rgba(128, 128, 128)' }}>
            added by {blog.user.name}
          </Typography>
          <Typography variant="h1" sx={{ fontSize: 18, marginBottom: 1 }}>
            {`${blog.likes} likes`} { user &&
              <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={() => like(blog.id)}>like</Button>
            }
            {user && user.id.toString() === blog.user.id.toString() && (
              <Button variant="outlined" color="error" sx={{ marginLeft: 1 }} onClick={() => removeBlog(blog.id)}>remove</Button> )
            }
          </Typography>
          <Typography variant="h1" sx={{ lineHeight: '90px', fontSize: 25, marginBottom: -3 }}>
            comments
          </Typography>

          <form onSubmit={sendComment}>
            <TextField label={'add a comment'} style={{ width: 250, marginBottom: 10 }} size="small"
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <Button type="submit" variant="contained" style={{ marginLeft: 8 }}>
              ADD COMMENT
            </Button>
          </form>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {blog.comments.map(comment => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      {comment.comment}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </div>
  )
}

export default Blog