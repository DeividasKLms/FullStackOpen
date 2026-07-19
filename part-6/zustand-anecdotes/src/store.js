import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes. concat(newAnecdote) }))
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
      }))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    },
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    setFilter: value => set(() => ({ filter: value })),
  },
}))

const useNotificationStore = create(set => ({
  notification: '',
  actions: {
    addNotification: async (content) => {
      console.log('state content:', content)
      set(() => ({ notification: `You added '${content}'` }))
      setTimeout(() => {
        set(() => ({ notification: '' }))
      }, 5000)
    },
    voteNotification: async (content) => {
      set(() => ({ notification: `You voted '${content}'` }))
      setTimeout(() => {
        set(() => ({ notification: '' }))
      }, 5000)
    }
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter === '') return anecdotes.toSorted((a, b) => b.votes - a.votes) 
  return anecdotes
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .toSorted((a, b) => b.votes - a.votes)
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)

export default useAnecdoteStore