import type {
  DeleteTodoListMutationVariables,
  FindTodoLists,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/TodoList/TodoListsCell'

import TodoListCard from '../TodoListCard/TodoListCard'

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {todoLists.map((todoList) => (
          <TodoListCard todoList={todoList} key={todoList.id} />
        ))}
      </div>
    </div>
  )
}

export default TodoListsList
