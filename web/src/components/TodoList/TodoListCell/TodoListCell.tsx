import type { FindTodoListById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TodoList from 'src/components/TodoList/TodoList'

export const QUERY = gql`
  query FindTodoListById($id: Int!) {
    todoList: todoList(id: $id) {
      id
      title
      createdAt
      user {
        email
      }
      items {
        id
        text
        isDone
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>TodoList not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ todoList }: CellSuccessProps<FindTodoListById>) => {
  return <TodoList todoList={todoList} />
}
