import type { FindTodoLists } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TodoListCard from '../TodoListCard/TodoListCard'

export const QUERY = gql`
  query FindTodoLists($limit: Int) {
    todoLists(limit: $limit) {
      createdAt
      id
      title
      user {
        email
      }
      _count {
        items
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
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {todoLists.map((todoList) => (
        <TodoListCard todoList={todoList} key={todoList.id} />
      ))}
    </div>
  )
}
