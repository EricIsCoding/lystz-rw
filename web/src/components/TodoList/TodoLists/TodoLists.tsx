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
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {todoLists.map((todoList) => (
          <div
            key={todoList.id}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 hover:text-teal-400">
                <Link to={routes.todoList({ id: todoList.id })}>
                  {truncate(todoList.title)}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Created at: {timeTag(todoList.createdAt)}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Created by: {truncate(todoList.user.email)}
              </p>
              <div className="mt-4 flex items-center justify-between">
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
