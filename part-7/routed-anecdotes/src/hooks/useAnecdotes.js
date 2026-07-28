import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(data => setAnecdotes(data))
  }, [])

  const addAnecdote = (anecdote) => {
    anecdoteService.createNew(anecdote).then(a => 
      setAnecdotes(anecdotes.concat({ ...a, id: Math.round(Math.random() * 10000)}))
    )
  }

  const removeAnecdote = (id) => {
    anecdoteService.remove(id).then(() =>
      setAnecdotes(anecdotes.filter( a => a.id !== id ))
    )
  } 

  return {
    anecdotes,
    addAnecdote,
    removeAnecdote
  }
}