import TodoListCell from 'src/components/TodoList/TodoListCell'

type TodoListPageProps = {
  id: number
}

const TodoListPage = ({ id }: TodoListPageProps) => {
  return <TodoListCell id={id} />
}

export default TodoListPage
