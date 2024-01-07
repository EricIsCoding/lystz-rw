import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/TodoItem/TodoItemsCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteTodoItemMutationVariables,
  FindTodoItems,
} from 'types/graphql'

const DELETE_TODO_ITEM_MUTATION = gql`
  mutation DeleteTodoItemMutation($id: Int!) {
    deleteTodoItem(id: $id) {
      id
    }
  }
`

const TodoItemsList = ({ todoItems }: FindTodoItems) => {
  const [deleteTodoItem] = useMutation(DELETE_TODO_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('TodoItem deleted')
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

  const onDeleteClick = (id: DeleteTodoItemMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete todoItem ' + id + '?')) {
      deleteTodoItem({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Text</th>
            <th>Is done</th>
            <th>Created at</th>
            <th>Todo list id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map((todoItem) => (
            <tr key={todoItem.id}>
              <td>{truncate(todoItem.id)}</td>
              <td>{truncate(todoItem.text)}</td>
              <td>{checkboxInputTag(todoItem.isDone)}</td>
              <td>{timeTag(todoItem.createdAt)}</td>
              <td>{truncate(todoItem.todoListId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.todoItem({ id: todoItem.id })}
                    title={'Show todoItem ' + todoItem.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTodoItem({ id: todoItem.id })}
                    title={'Edit todoItem ' + todoItem.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete todoItem ' + todoItem.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(todoItem.id)}
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

export default TodoItemsList
