import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TodoListForm from 'src/components/TodoList/TodoListForm'

import type { CreateTodoListInput } from 'types/graphql'

const CREATE_TODO_LIST_MUTATION = gql`
  mutation CreateTodoListMutation($input: CreateTodoListInput!) {
    createTodoList(input: $input) {
      id
    }
  }
`

const NewTodoList = () => {
  const [createTodoList, { loading, error }] = useMutation(
    CREATE_TODO_LIST_MUTATION,
    {
      onCompleted: () => {
        toast.success('TodoList created')
        navigate(routes.todoLists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateTodoListInput) => {
    createTodoList({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New TodoList</h2>
      </header>
      <div className="rw-segment-main">
        <TodoListForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTodoList
