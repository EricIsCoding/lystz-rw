import type { FindTodoItems } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TodoItems from 'src/components/TodoItem/TodoItems'

export const QUERY = gql`
  query FindTodoItems {
    todoItems {
      id
      text
      isDone
      createdAt
      todoList {
        title
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No todoItems yet. '}
      <Link to={routes.newTodoItem()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ todoItems }: CellSuccessProps<FindTodoItems>) => {
  return <TodoItems todoItems={todoItems} />
}
