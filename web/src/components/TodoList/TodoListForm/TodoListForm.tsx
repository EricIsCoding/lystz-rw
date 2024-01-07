import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditTodoListById, UpdateTodoListInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormTodoList = NonNullable<EditTodoListById['todoList']>

interface TodoListFormProps {
  todoList?: EditTodoListById['todoList']
  onSave: (data: UpdateTodoListInput, id?: FormTodoList['id']) => void
  error: RWGqlError
  loading: boolean
}

const TodoListForm = (props: TodoListFormProps) => {
  const onSubmit = (data: FormTodoList) => {
    props.onSave(data, props?.todoList?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTodoList> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.todoList?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.todoList?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TodoListForm
