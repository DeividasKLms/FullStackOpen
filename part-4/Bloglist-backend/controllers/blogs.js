const blogRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const blog = request.body
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes || 0,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  await savedBlog.populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).json({ error: 'blog is missing' })
  }

  const user = request.user

  if (!(blog.user.toString() === user.id.toString())) {
    return response.status(401).json({ error: 'invalid user' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const { likes } = request.body

  if (!blog) {
    return response.status(400).json({ error: 'blog is missing' })
  }
  
  const user = request.user

  if (!(blog.user.toString() === user.id.toString())) {
    return response.status(401).json({ error: 'invalid user' })
  }

  blog.likes = likes

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 })
  response.json(savedBlog)
})

module.exports = blogRouter