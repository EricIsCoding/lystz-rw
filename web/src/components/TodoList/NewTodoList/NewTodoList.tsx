import type { CreateTodoListInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TodoListForm from 'src/components/TodoList/TodoListForm'

const CREATE_TODO_LIST_MUTATION = gql`
  mutation CreateTodoListMutation($input: CreateTodoListInput!) {
    createTodoList(input: $input) {
      id
    }
  }
`
const GET_STORES_QUERY = gql`
  query GetStores {
    stores {
      id
      name
    }
  }
`

const NewTodoList = () => {
  const [createTodoList, { error: mutationError, loading: mutationLoading }] =
    useMutation(CREATE_TODO_LIST_MUTATION, {
      onCompleted: () => {
        toast.success('TodoList created')
        navigate(routes.todoLists())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_STORES_QUERY)

  const combinedLoading = mutationLoading || queryLoading
  const combinedError = mutationError || queryError

  const onSave = (input: CreateTodoListInput) => {
    createTodoList({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New TodoList</h2>
      </header>
      <div className="rw-segment-main">
        <TodoListForm
          onSave={onSave}
          loading={combinedLoading}
          error={combinedError}
          stores={data?.stores}
        />
      </div>
    </div>
  )
}

export default NewTodoList
