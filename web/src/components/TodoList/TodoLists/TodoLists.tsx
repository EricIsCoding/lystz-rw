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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todoLists.map((todoList) => (
          <div
            key={todoList.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 hover:text-teal-400">
                <Link to={routes.todoList({ id: todoList.id })}>
                  {truncate(todoList.title)}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mt-2">ID: {todoList.id}</p>
              <p className="text-sm text-gray-600 mt-1">
                Created at: {timeTag(todoList.createdAt)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Created by: {truncate(todoList.user.email)}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={routes.editTodoList({ id: todoList.id })}
                  className="text-indigo-500 hover:text-indigo-800"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-800"
                  onClick={() => onDeleteClick(todoList.id)}
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

export default TodoListsList
