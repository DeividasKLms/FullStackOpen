import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Blog from './Blog'

describe('<Blog />', () => {
  test('no user logged in, no buttons visible', () => {
    const blog = {
      title: 'Surfs up!',
      author: 'Elvis Presley',
      url: 'https://youtu.be/dQw4w9WgXcQ?si=WPzYXV_Hj_T3Etp8',
      likes: 0,
      user: { name: 'Superuser', id: '123' }
    }

    const { container, queryByRole } = render(
      <MemoryRouter>
        <Blog blog={blog} user={null} />
      </MemoryRouter>
    )
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Elvis Presley: Surfs up!')
    expect(div).toHaveTextContent('likes: 0')
    expect(queryByRole('button', { name: 'remove' })).toBeNull()
    expect(queryByRole('button', { name: 'like' })).toBeNull()
  })

  test('different user, only like button visible', async () => {
    const blog = {
      title: 'Surfs up!',
      author: 'Elvis Presley',
      url: 'https://youtu.be/dQw4w9WgXcQ?si=WPzYXV_Hj_T3Etp8',
      likes: 0,
      user: { name: 'Superuser', id: '123' }
    }

    const { container, queryByRole } = render(
      <MemoryRouter>
        <Blog blog={blog} user={{ name: 'Groot', id: '133' }} />
      </MemoryRouter>
    )
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Elvis Presley: Surfs up!')
    expect(queryByRole('button', { name: 'remove' })).toBeNull()
    expect(queryByRole('button', { name: 'like' })).toBeVisible()
  })

  test('remove button visible for creator of blog', async () => {
    const blog = {
      title: 'Surfs up!',
      author: 'Elvis Presley',
      url: 'https://youtu.be/dQw4w9WgXcQ?si=WPzYXV_Hj_T3Etp8',
      likes: 0,
      user: { name: 'Superuser', id: '123' }
    }

    const { container, queryByRole } = render(
      <MemoryRouter>
        <Blog blog={blog} user={{ name: 'Superuser', id: '123' }} />
      </MemoryRouter>
    )
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Elvis Presley: Surfs up!')
    expect(queryByRole('button', { name: 'remove' })).toBeVisible()
  })
})