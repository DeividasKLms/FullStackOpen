import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('voting increases vote count', async () => {
    const anecdote = { id: 1, content: 'Test', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [anecdote] })
    anecdoteService.update.mockResolvedValue(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote(anecdote.id)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current[0]).toBe(1)
  })

  describe('sorting/filtering', () => {
    const anecdotes = [
      { id: 1, content: 'A', votes: 0 },
      { id: 2, content: 'B', votes: 3 }
    ]

    beforeEach(() => {
      useAnecdoteStore.setState({ anecdotes })
    })

    it('anecdotes are sorted by votes', async () => {
      const { result } = renderHook(() => useAnecdotes())
      expect(result.current[0]).toEqual(anecdotes[1])
    })

    it('anecdote filter works', async () => {
      useAnecdoteStore.setState({ anecdotes, filter: 'B' })
      const { result } = renderHook(() => useAnecdotes())
      expect(result.current[0]).toEqual(anecdotes[1])
    })
  })
})