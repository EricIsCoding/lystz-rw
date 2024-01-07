import type { EditTodoItemById, UpdateTodoItemInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TodoItemForm from 'src/components/TodoItem/TodoItemForm'

export const QUERY = gql`
  query EditTodoItemById($id: Int!) {
    todoItem: todoItem(id: $id) {
      id
      text
      isDone
      createdAt
      todoListId
    }
  }
`
const UPDATE_TODO_ITEM_MUTATION = gql`
  mutation UpdateTodoItemMutation($id: Int!, $input: UpdateTodoItemInput!) {
    updateTodoItem(id: $id, input: $input) {
      id
      text
      isDone
      createdAt
      todoListId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ todoItem }: CellSuccessProps<EditTodoItemById>) => {
  const [updateTodoItem, { loading, error }] = useMutation(
    UPDATE_TODO_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('TodoItem updated')
        navigate(routes.todoItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateTodoItemInput,
    id: EditTodoItemById['todoItem']['id']
  ) => {
    updateTodoItem({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit TodoItem {todoItem?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TodoItemForm
          todoItem={todoItem}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
