import EditTodoItemCell from 'src/components/TodoItem/EditTodoItemCell'

type TodoItemPageProps = {
  id: number
}

const EditTodoItemPage = ({ id }: TodoItemPageProps) => {
  return <EditTodoItemCell id={id} />
}

export default EditTodoItemPage
