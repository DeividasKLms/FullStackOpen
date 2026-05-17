import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders content', () => {
    const blog = {
      title: 'Surfs up!',
      author: 'Elvis Presley',
      url: 'https://youtu.be/dQw4w9WgXcQ?si=WPzYXV_Hj_T3Etp8'
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')

    screen.debug(div)

    expect(div).toHaveTextContent('Surfs up! Elvis Presley')
  })

  test('renders likes and url when button is pressed', async () => {
    const blog = {
      title: 'Surfs up!',
      author: 'Elvis Presley',
      url: 'https://youtu.be/dQw4w9WgXcQ?si=chv98e9bF7IHqA9_',
      likes: 0,
      user: { name: 'Superuser', id: '123' }
    }

    const { container } = render(<Blog blog={blog} user={{ name: 'Superuser', id: '123' }}/>)
    const div = container.querySelector('.blog')

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    screen.debug(div)

    expect(div).toHaveTextContent('https://youtu.be/dQw4w9WgXcQ?si=chv98e9bF7IHqA9_')
    expect(div).toHaveTextContent('likes: 0')
  })

  test('renders like button click twice', async () => {
    const blog = {
      title: 'Surfs up!',
      author: 'Elvis Presley',
      url: 'https://youtu.be/dQw4w9WgXcQ?si=chv98e9bF7IHqA9_',
      likes: 0,
      user: { name: 'Superuser', id: '123' }
    }

    const addLikes = vi.fn()
    render(
      <Blog
        blog={blog}
        user={{ name: 'Superuser', id: '123' }}
        addLikes={addLikes}
      />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')

    await user.click(viewButton)

    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(addLikes.mock.calls).toHaveLength(2)
  })
})