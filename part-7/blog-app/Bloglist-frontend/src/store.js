import { create } from 'zustand'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

const useNotificationStore = create((set) => ({
  notificationText: null,
  notificationType: null,
  actions: {
    badLoginNotification: async () => {
      set(() => ({ notificationText: 'wrong username or password' }))
      set(() => ({ notificationType: 'error' }))
      setTimeout(() => {
        set(() => ({ notificationText: null }))
        set(() => ({ notificationType: null }))
      }, 5000)
    },
    addBlogNotification: async (title, author) => {
      set(() => ({ notificationText: `a new blog ${title} by ${author} added` }))
      set(() => ({ notificationType: 'success' }))
      setTimeout(() => {
        set(() => ({ notificationText: null }))
        set(() => ({ notificationType: null }))
      }, 5000)
    },
    badBlogNotification: async () => {
      set(() => ({ notificationText: 'wrong or missing userId' }))
      set(() => ({ notificationType: 'error' }))
      setTimeout(() => {
        set(() => ({ notificationText: null }))
        set(() => ({ notificationType: null }))
      }, 5000)
    }
  }
}))

const useBlogStore = create((set, get) => ({
  blogs: [],
  title: '',
  author: '',
  url: '',
  comment: '',
  actions: {
    initialize: async () => {
      const blogs = await blogService.getAll()
      set(() => ({ blogs }))
    },
    setTitle: value => set(() => ({ title: value })),
    setAuthor: value => set(() => ({ author: value })),
    setUrl: value => set(() => ({ url: value })),
    setComment: value => set(() => ({ comment: value })),
    add: async (blog) => {
      const newBlog = await blogService.create(blog)
      set(state => ({ blogs: state.blogs.concat(newBlog) }))
    },
    like: async (id) => {
      const blog = get().blogs.find(b => b.id === id)
      const updated = await blogService.addLikes(
        id, { ...blog, likes: blog.likes + 1 }
      )
      set(state => ({
        blogs: state.blogs.map(b => b.id === id ? updated : b)
      }))
    },
    remove: async (id) => {
      await blogService.remove(id)
      set(state => ({
        blogs: state.blogs.filter(b => b.id !== id)
      }))
    },
    addComment: async (id, comment) => {
      const addedComment = await blogService.comment(id, comment)
      set(state => ({
        blogs: state.blogs.map(b => b.id === id
          ? { ...b, comments: b.comments.concat(addedComment) }
          : b
        )
      }))
    }
  }
}))

const useUserStore = create((set) => ({
  users: [],
  username: '',
  password: '',
  user: null,
  actions: {
    initializeUsers: async () => {
      const users = await userService.getAll()
      set(() => ({ users }))
    },
    getUser: async (loggedUserJSON) => {
      if (loggedUserJSON) {
        const user = loggedUserJSON
        set(() => ({ user: user }))
        blogService.setToken(user.token)
      }
    },
    setUsername: value => set(() => ({ username: value })),
    setPassword: value => set(() => ({ password: value })),
    login: async (username, password) => {
      const userLogin = await loginService.login({ username, password })
      set(() => ({ user: userLogin }))
      blogService
        .setToken(userLogin.token)
      return userLogin
    },
    logout: async () => {
      set(() => ({ user: null }))
    }
  }
}))

export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useBlogActions = () => useBlogStore((state) => state.actions)

export const useNotificationText = () => useNotificationStore((state) => state.notificationText)
export const useNotificationType = () => useNotificationStore((state) => state.notificationType)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)

export const useUserUsername = () => useUserStore((state) => state.username)
export const useUserPassword = () => useUserStore((state) => state.password)
export const useUser = () => useUserStore((state) => state.user)
export const useUsers = () => useUserStore((state) => state.users)
export const useUserActions = () => useUserStore((state) => state.actions)

export default useBlogStore