import type {
  DeleteTodoListMutationVariables,
  FindTodoListById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_TODO_LIST_MUTATION = gql`
  mutation DeleteTodoListMutation($id: Int!) {
    deleteTodoList(id: $id) {
      id
    }
  }
`

interface Props {
  todoList: NonNullable<FindTodoListById['todoList']>
}

const TodoList = ({ todoList }: Props) => {
  const [deleteTodoList] = useMutation(DELETE_TODO_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('TodoList deleted')
      navigate(routes.todoLists())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTodoListMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete todoList ' + id + '?')) {
      deleteTodoList({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            TodoList {todoList.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{todoList.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{todoList.title}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(todoList.createdAt)}</td>
            </tr>
            <tr>
              <th>Created by:</th>
              <td>{todoList.user.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTodoList({ id: todoList.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(todoList.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default TodoList
