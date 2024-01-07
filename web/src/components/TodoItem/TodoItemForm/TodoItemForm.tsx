import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditTodoItemById, UpdateTodoItemInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormTodoItem = NonNullable<EditTodoItemById['todoItem']>

interface TodoItemFormProps {
  todoItem?: EditTodoItemById['todoItem']
  onSave: (data: UpdateTodoItemInput, id?: FormTodoItem['id']) => void
  error: RWGqlError
  loading: boolean
}

const TodoItemForm = (props: TodoItemFormProps) => {
  const onSubmit = (data: FormTodoItem) => {
    props.onSave(data, props?.todoItem?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTodoItem> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="text"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Text
        </Label>

        <TextField
          name="text"
          defaultValue={props.todoItem?.text}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="text" className="rw-field-error" />

        <Label
          name="isDone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is done
        </Label>

        <CheckboxField
          name="isDone"
          defaultChecked={props.todoItem?.isDone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isDone" className="rw-field-error" />

        <Label
          name="todoListId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Todo list id
        </Label>

        <NumberField
          name="todoListId"
          defaultValue={props.todoItem?.todoListId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="todoListId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TodoItemForm
