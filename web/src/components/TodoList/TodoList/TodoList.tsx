import React, { useState } from 'react'

import type {
  CreateTodoItemInput,
  DeleteTodoListMutationVariables,
  FindTodoListById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TodoItemForm from 'src/components/TodoItem/TodoItemForm'

const DELETE_TODO_LIST_MUTATION = gql`
  mutation DeleteTodoListMutation($id: Int!) {
    deleteTodoList(id: $id) {
      id
    }
  }
`
const CREATE_TODO_ITEM_MUTATION = gql`
  mutation CreateTodoItemMutation($input: CreateTodoItemInput!) {
    createTodoItem(input: $input) {
      id
    }
  }
`
const GET_TODO_LISTS_QUERY = gql`
  query GetTodoLists {
    todoLists {
      id
      title
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
  const [createTodoItem, { loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_TODO_ITEM_MUTATION, {
      onCompleted: () => {
        toast.success('TodoItem created')
        window.location.reload()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_TODO_LISTS_QUERY)

  const onSave = (input: CreateTodoItemInput) => {
    createTodoItem({ variables: { input } })
  }

  const combinedLoading = mutationLoading || queryLoading
  const combinedError = mutationError || queryError

  const [showAddForm, setShowAddForm] = useState(false)

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  const onDeleteClick = (id: DeleteTodoListMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete todoList ' + id + '?')) {
      deleteTodoList({ variables: { id } })
    }
  }

  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <header className="bg-teal-600 px-4 py-5 text-white sm:px-6">
          <h2 className="text-xl font-semibold">{todoList.title}</h2>
        </header>
      </div>

      {/* Todo Items List */}
      <div className="mb-6 bg-white p-1 shadow sm:rounded-lg">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Items</h3>
          <button
            onClick={toggleAddForm}
            className="rounded bg-teal-400 px-4 py-2 font-medium text-white hover:bg-teal-500"
          >
            Add Item
          </button>
        </div>

        {showAddForm && (
          <div className="p-4">
            {/* Your form goes here. Pre-select the todoListId radio button */}
            <TodoItemForm
              onSave={onSave}
              loading={combinedLoading}
              error={combinedError}
              todoLists={data?.todoLists} /* other props */
            />
          </div>
        )}

        <ul className="divide-y divide-gray-200">
          {todoList.items.map((item) => (
            <li key={item.id} className="px-4 py-4 hover:bg-gray-50 sm:px-6">
              <Link to={routes.todoItem({ id: item.id })} className="block">
                <div className="flex items-center justify-between px-4 py-4 sm:px-6">
                  <span
                    className={
                      item.isDone
                        ? 'text-gray-500 line-through'
                        : 'text-gray-700'
                    }
                  >
                    {item.text}
                  </span>
                  {/* Additional item details or actions */}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/*Buttons*/}
      <nav className="mt-4 flex justify-end space-x-4">
        <Link
          to={routes.editTodoList({ id: todoList.id })}
          className="rounded bg-teal-400 px-4 py-2 font-medium text-white hover:bg-teal-500"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          onClick={() => onDeleteClick(todoList.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default TodoList
