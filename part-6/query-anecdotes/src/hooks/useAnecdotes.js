import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import useNotify from './useNotification'

export const useAnecdotes = () => {
  const { renderNotification } = useNotify()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      renderNotification(`anecdote '${newAnecdote.content}' added`)
    },
    onError: () => {
      renderNotification('too short anecdote, must have 5 or more')
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      renderNotification(`anecdote '${updatedAnecdote.content}' voted`)
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    vote: (anecdote) => updateAnecdoteMutation.mutate({
      ...anecdote, votes: anecdote.votes + 1
    })
  }
}