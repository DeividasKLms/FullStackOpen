import { useAnecdotes, useAnecdoteActions,
useNotificationActions } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteActions()
  const { voteNotification } = useNotificationActions()

  return (
    <div>
      {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)
                && voteNotification(anecdote.content)}>vote</button>
              {anecdote.votes === 0
                ? <button onClick={() => remove(anecdote.id)}>remove</button>
                : null
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default AnecdoteList