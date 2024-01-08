import type { CreateTodoItemInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TodoItemForm from 'src/components/TodoItem/TodoItemForm'

const CREATE_TODO_ITEM_MUTATION = gql`
  mutation CreateTodoItemMutation($input: CreateTodoItemInput!) {
    createTodoItem(input: $input) {
      id
    }
  }
`
const GET_TODO_LISTS_QUERY = gql`
  query GetTodoLists {
    todoLists {
      id
      title
    }
  }
`

const NewTodoItem = () => {
  const [createTodoItem, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_TODO_ITEM_MUTATION, {
      onCompleted: () => {
        toast.success('TodoItem created')
        navigate(routes.todoItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_TODO_LISTS_QUERY)

  const onSave = (input: CreateTodoItemInput) => {
    createTodoItem({ variables: { input } })
  }

  const combinedLoading = mutationLoading || queryLoading
  const combinedError = mutationError || queryError

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New TodoItem</h2>
      </header>
      <div className="rw-segment-main">
        <TodoItemForm
          onSave={onSave}
          loading={combinedLoading}
          error={combinedError}
          todoLists={data?.todoLists}
        />
      </div>
    </div>
  )
}

export default NewTodoItem
