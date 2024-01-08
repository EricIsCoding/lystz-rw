import type {
  DeleteTodoItemMutationVariables,
  FindTodoItems,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/TodoItem/TodoItemsCell'
import { timeTag, truncate } from 'src/lib/formatters'

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todoItems.map((todoItem) => (
          <div
            key={todoItem.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 hover:text-teal-900">
                <Link to={routes.todoItem({ id: todoItem.id })}>
                  {truncate(todoItem.text)}
                </Link>
              </h3>
              <p className="text-sm text-gray-600">
                Is done: {truncate(todoItem.isDone.toString())}
              </p>
              <p className="text-sm text-gray-600">
                Created at: {timeTag(todoItem.createdAt)}
              </p>
              <p className="text-sm text-gray-600">
                Todo list: {todoItem.todoList.title}
              </p>
              <div className="mt-4 flex justify-start gap-2">
                <Link
                  to={routes.editTodoItem({ id: todoItem.id })}
                  className="text-teal-400 hover:text-teal-900"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-800"
                  onClick={() => onDeleteClick(todoItem.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoItemsList
