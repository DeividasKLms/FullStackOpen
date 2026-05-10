const Remove = () => (
  window.localStorage.removeItem('loggedBlogappUser')
)

const Login = ({ user }) => (
  <div>
    {user.username} logged in <button onClick={Remove}>loggout</button>
  </div>
)

export default Login