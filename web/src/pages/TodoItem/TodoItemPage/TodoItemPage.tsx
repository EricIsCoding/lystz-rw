import TodoItemCell from 'src/components/TodoItem/TodoItemCell'

type TodoItemPageProps = {
  id: number
}

const TodoItemPage = ({ id }: TodoItemPageProps) => {
  return <TodoItemCell id={id} />
}

export default TodoItemPage
