import type {
  DeleteTodoListMutationVariables,
  FindTodoLists,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/TodoList/TodoListsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_TODO_LIST_MUTATION = gql`
  mutation DeleteTodoListMutation($id: Int!) {
    deleteTodoList(id: $id) {
      id
    }
  }
`

const TodoListsList = ({ todoLists }: FindTodoLists) => {
  const [deleteTodoList] = useMutation(DELETE_TODO_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('TodoList deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteTodoListMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete todoList ' + id + '?')) {
      deleteTodoList({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Created at</th>
            <th>Created by:</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {todoLists.map((todoList) => (
            <tr key={todoList.id}>
              <td>{truncate(todoList.id)}</td>
              <td>{truncate(todoList.title)}</td>
              <td>{timeTag(todoList.createdAt)}</td>
              <td>{truncate(todoList.user.email)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.todoList({ id: todoList.id })}
                    title={'Show todoList ' + todoList.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTodoList({ id: todoList.id })}
                    title={'Edit todoList ' + todoList.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete todoList ' + todoList.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(todoList.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoListsList
