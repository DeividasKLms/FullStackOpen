const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'The Rumbling',
    author: 'John The',
    url: 'https://youtu.be/dQw4w9WgXcQ?si=cCU0xbSYWabq_ZPR',
    likes: 18000000,
  },
  {
    title: 'The Thing',
    author: 'John Thing',
    url: 'https://youtu.be/dQw4w9WgXcQ?si=cCU0xbSYWabq_ZPR',
    likes: 2,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('has id identifier', async () => {
  const response = await api.get('/api/blogs')
  blogToView = response.body[0]

  assert.strictEqual(blogToView.hasOwnProperty('id'), true)
})

describe('adding blogs, deleting, updating with authentication', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('tester', 10)
    const user = new User({ username: 'tester', name: 'tester', passwordHash })

    await user.save()
  })

  let token = ''

  beforeEach(async () => {
    const login = await api.post('/api/login').send({ username: 'tester', password: 'tester' })
    token = login.body.token

    await Blog.deleteMany({})
    const user = await User.findOne({ username: 'tester' })
    const blogObjects = initialBlogs.map(b => new Blog({ ...b, user: user._id }))
    await Promise.all(blogObjects.map(b => b.save()))
  })

  test('one blog post has been added', async () => {
    const newBlog = {
      title: 'async new content',
      author: 'John Async',
      url: 'https://youtu.be/dQw4w9WgXcQ?si=cCU0xbSYWabq_ZPR',
      likes: 5,
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    const contents = response.body.map(b => b.title)
    assert(contents.includes('async new content'))
  })

  test('new blog added without likes', async () => {
    const newBlog = {
      title: 'async new content',
      author: 'John Async',
      url: 'https://youtu.be/dQw4w9WgXcQ?si=cCU0xbSYWabq_ZPR',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    const contents = response.body.map(b => b.likes)
    assert(contents.includes(0))
  })

  test('unable to add new blog without url', async () => {
    const newBlog = {
      title: 'async new content',
      author: 'John Await',
      likes: 69,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('unable to add new blog without title', async () => {
    const newBlog = {
      author: 'John Title',
      url: 'https://youtu.be/dQw4w9WgXcQ?si=cCU0xbSYWabq_ZPR',
      likes: 12345,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('a blog post can be deleted', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    const ids = blogsAtEnd.body.map(b => b.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length - 1)
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]

    const newBlog = {
      title: 'The Rumbling',
      author: 'John The',
      url: 'https://youtu.be/dQw4w9WgXcQ?si=cCU0xbSYWabq_ZPR',
      likes: 20000000,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length)

    const likes = blogsAtEnd.body.map(b => b.likes)
    assert(likes.includes(20000000))
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'LoonerBin',
      name: 'John Looney',
      password: 'obamium'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and mesage if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'obamium'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('test fails if the username is less than 3 letters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'obamium'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username or password is too short'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('test fails if the password is less than 3 letters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'RootBeer',
      name: 'Superuser',
      password: 'ob'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username or password is too short'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('test fails if the username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      name: 'Superuser',
      password: 'obamium'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username or password is missing'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('test fails if the username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'RootBeer',
      name: 'Superuser',
      password: ''
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username or password is missing'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})