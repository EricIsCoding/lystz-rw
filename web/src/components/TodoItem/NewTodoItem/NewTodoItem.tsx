import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TodoItemForm from 'src/components/TodoItem/TodoItemForm'

import type { CreateTodoItemInput } from 'types/graphql'

const CREATE_TODO_ITEM_MUTATION = gql`
  mutation CreateTodoItemMutation($input: CreateTodoItemInput!) {
    createTodoItem(input: $input) {
      id
    }
  }
`

const NewTodoItem = () => {
  const [createTodoItem, { loading, error }] = useMutation(
    CREATE_TODO_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('TodoItem created')
        navigate(routes.todoItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateTodoItemInput) => {
    createTodoItem({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New TodoItem</h2>
      </header>
      <div className="rw-segment-main">
        <TodoItemForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTodoItem
