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
      <div className="m-1 overflow-hidden rounded-lg bg-white shadow-md">
        <header className="bg-gray-50 px-4 py-5 sm:px-6">
          <h2 className="text-xl font-semibold leading-6 text-gray-800">
            {todoItem.text}
          </h2>
        </header>
        <div className="border-t border-gray-200">
          <dl>
            {/* Description Section */}
            <div className="grid grid-cols-1 gap-4 bg-white px-4 py-5 sm:px-6 md:grid-cols-3">
              <dt className="text-sm font-semibold text-gray-600">
                Description
              </dt>
              <dd className="mt-1 text-sm text-gray-900 md:col-span-2 md:mt-0">
                {todoItem.description}
              </dd>
            </div>

            {/* Status Section */}
            <div className="grid grid-cols-1 gap-4 bg-gray-50 px-4 py-5 sm:px-6 md:grid-cols-3">
              <dt className="text-sm font-semibold text-gray-600">Is done</dt>
              <dd className="mt-1 text-sm text-gray-900 md:col-span-2 md:mt-0">
                {todoItem.isDone.toString()}
              </dd>
            </div>

            {/* Created At Section */}
            <div className="grid grid-cols-1 gap-4 bg-white px-4 py-5 sm:px-6 md:grid-cols-3">
              <dt className="text-sm font-semibold text-gray-600">
                Created at
              </dt>
              <dd className="mt-1 text-sm text-gray-900 md:col-span-2 md:mt-0">
                {timeTag(todoItem.createdAt)}
              </dd>
            </div>

            {/* Todo List Title Section */}
            <div className="grid grid-cols-1 gap-4 bg-gray-50 px-4 py-5 sm:px-6 md:grid-cols-3">
              <dt className="text-sm font-semibold text-gray-600">
                Todo list:
              </dt>
              <dd className="mt-1 text-sm text-gray-900 md:col-span-2 md:mt-0">
                {todoItem.todoList.title}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Action Buttons */}
      <nav className="mt-4 flex items-center justify-between">
        <Link
          to={routes.editTodoItem({ id: todoItem.id })}
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-blue-700"
        >
          Edit
        </Link>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-red-700"
          onClick={() => onDeleteClick(todoItem.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default TodoItem
