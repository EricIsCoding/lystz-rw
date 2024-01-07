import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

import type {
  DeleteTodoItemMutationVariables,
  FindTodoItemById,
} from 'types/graphql'

const DELETE_TODO_ITEM_MUTATION = gql`
  mutation DeleteTodoItemMutation($id: Int!) {
    deleteTodoItem(id: $id) {
      id
    }
  }
`

interface Props {
  todoItem: NonNullable<FindTodoItemById['todoItem']>
}

const TodoItem = ({ todoItem }: Props) => {
  const [deleteTodoItem] = useMutation(DELETE_TODO_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('TodoItem deleted')
      navigate(routes.todoItems())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTodoItemMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete todoItem ' + id + '?')) {
      deleteTodoItem({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            TodoItem {todoItem.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{todoItem.id}</td>
            </tr>
            <tr>
              <th>Text</th>
              <td>{todoItem.text}</td>
            </tr>
            <tr>
              <th>Is done</th>
              <td>{checkboxInputTag(todoItem.isDone)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(todoItem.createdAt)}</td>
            </tr>
            <tr>
              <th>Todo list id</th>
              <td>{todoItem.todoListId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTodoItem({ id: todoItem.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(todoItem.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default TodoItem
