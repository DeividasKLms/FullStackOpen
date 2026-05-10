import { useState } from 'react'

const Blog = ({ blog, addLikes, user, remove }) => {
  const [viewVisible, setViewVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setViewVisible(!viewVisible)}>view</button>

        {!viewVisible && ''}
        {viewVisible &&
        <div>
          {blog.url} <br/>
          {`likes: ${blog.likes}`} <button onClick={addLikes}>like</button> <br/>
          {blog.user.name} <br/>
          {user.id.toString() === blog.user.id.toString() &&
          <button onClick={remove}>remove</button>
          }
        </div>
        }
      </div>
    </div>
  )}

export default Blog