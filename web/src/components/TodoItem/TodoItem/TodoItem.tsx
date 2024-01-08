import type {
  DeleteTodoItemMutationVariables,
  FindTodoItemById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

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
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <header className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            {todoItem.text}
          </h2>
        </header>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {todoItem.description}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Is done</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {todoItem.isDone.toString()}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created at</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {timeTag(todoItem.createdAt)}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Todo list:</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {todoItem.todoList.title}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <nav className="flex items-center justify-between mt-4">
        <Link
          to={routes.editTodoItem({ id: todoItem.id })}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Edit
        </Link>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          onClick={() => onDeleteClick(todoItem.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default TodoItem
