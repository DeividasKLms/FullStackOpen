import { TableContainer, Table, TableHead, TableBody,
  TableRow, TableCell, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useUsers } from '../store'

const UserList = () => {
  const users = useUsers()
  const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length)

  return (
    <div>
      <Typography variant="h1" sx={{ fontSize: 30, lineHeight: '70px', minWidth: 300, minHeight: 40 }}>
        Users
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map(row =>
              <TableRow key={row.id}>
                <TableCell><Link to={`/users/${row.id}`}>{row.name}</Link></TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList