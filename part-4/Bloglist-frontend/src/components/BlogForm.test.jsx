import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()
  const messageType = vi.fn()
  const message = vi.fn()

  render(<BlogForm
    createBlog={createBlog}
    messageType={messageType}
    message={message}/>)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'Surfs up!')
  await user.type(author, 'Elvis Presley')
  await user.type(url, 'https://youtu.be/dQw4w9WgXcQ?si=chv98e9bF7IHqA9_')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Surfs up!')
  expect(createBlog.mock.calls[0][0].author).toBe('Elvis Presley')
  expect(createBlog.mock.calls[0][0].url).toBe('https://youtu.be/dQw4w9WgXcQ?si=chv98e9bF7IHqA9_')
})