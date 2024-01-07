import type { FindTodoLists } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TodoLists from 'src/components/TodoList/TodoLists'

export const QUERY = gql`
  query FindTodoLists {
    todoLists {
      createdAt
      id
      title
      user {
        email
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No todoLists yet. '}
      <Link to={routes.newTodoList()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ todoLists }: CellSuccessProps<FindTodoLists>) => {
  return <TodoLists todoLists={todoLists} />
}
