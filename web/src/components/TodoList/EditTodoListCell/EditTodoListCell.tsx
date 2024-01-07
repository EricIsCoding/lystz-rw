import type { EditTodoListById, UpdateTodoListInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TodoListForm from 'src/components/TodoList/TodoListForm'

export const QUERY = gql`
  query EditTodoListById($id: Int!) {
    todoList: todoList(id: $id) {
      id
      title
      createdAt
      userId
    }
  }
`
const UPDATE_TODO_LIST_MUTATION = gql`
  mutation UpdateTodoListMutation($id: Int!, $input: UpdateTodoListInput!) {
    updateTodoList(id: $id, input: $input) {
      id
      title
      createdAt
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ todoList }: CellSuccessProps<EditTodoListById>) => {
  const [updateTodoList, { loading, error }] = useMutation(
    UPDATE_TODO_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('TodoList updated')
        navigate(routes.todoLists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateTodoListInput,
    id: EditTodoListById['todoList']['id']
  ) => {
    updateTodoList({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit TodoList {todoList?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TodoListForm
          todoList={todoList}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
