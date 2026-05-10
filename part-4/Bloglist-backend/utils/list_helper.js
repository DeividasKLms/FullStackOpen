const _ = require('lodash')

const totalLikes = blogs => {
  const likeSum = (sum, blog) => {
    return sum + blog.likes
  }

  if (blogs.length === 1)
    return blogs[0].likes

  return blogs.length === 0
    ? 0
    : blogs.reduce(likeSum, 0)
}

const favoriteBlog = blogs => {
  const maxLikes = (max, blog) => {
    return max.likes > blog.likes
    ? max
    : blog
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(maxLikes)
}

const mostBlogs = blogPosts => {
  const all = _.countBy(blogPosts, 'author')
  const most = _.map(all, (key, value) => {
    return {'author': value, 'blogs': key}
  })

  if (blogPosts.length === 0)
    return null

  return _.maxBy(most, 'blogs')
}

const mostLikes = blogs => {
  if (blogs.length === 0)
    return null

  const likeSum = {}
  const authors = _.groupBy(blogs, 'author')

  _.forEach(authors, (value, key) => {
    likeSum[key] = _.sumBy(value, 'likes')
  })

  const authorLikes = _.map(likeSum, (value, key) => {
    return { author: key, likes: value }
  })

  return _.maxBy(authorLikes, 'likes')
}

module.exports = {
  mostLikes,
  mostBlogs,
  favoriteBlog,
  totalLikes
}