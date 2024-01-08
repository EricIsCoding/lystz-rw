import type { FindTodoItemById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TodoItem from 'src/components/TodoItem/TodoItem'

export const QUERY = gql`
  query FindTodoItemById($id: Int!) {
    todoItem: todoItem(id: $id) {
      id
      text
      isDone
      createdAt
      todoList {
        title
      }
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>TodoItem not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ todoItem }: CellSuccessProps<FindTodoItemById>) => {
  return <TodoItem todoItem={todoItem} />
}
