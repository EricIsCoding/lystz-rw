import EditTodoListCell from 'src/components/TodoList/EditTodoListCell'

type TodoListPageProps = {
  id: number
}

const EditTodoListPage = ({ id }: TodoListPageProps) => {
  return <EditTodoListCell id={id} />
}

export default EditTodoListPage
