import type { EditTodoListById, UpdateTodoListInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  RadioField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormTodoList = NonNullable<EditTodoListById['todoList']>

interface TodoListFormProps {
  todoList?: EditTodoListById['todoList']
  onSave: (data: UpdateTodoListInput, id?: FormTodoList['id']) => void
  error: RWGqlError
  loading: boolean
  stores: Store[]
}

const TodoListForm = (props: TodoListFormProps) => {
  const onSubmit = (data: FormTodoList) => {
    const intParsedData = { ...data, storeId: parseInt(data.storeId) }
    console.log(intParsedData)
    props.onSave(intParsedData, props?.todoList?.id)
  }

  console.log(props.stores)

  return (
    <div className="rw-form-wrapper mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
      <Form<FormTodoList> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper mb-4"
          titleClassName="rw-form-error-title text-red-500 text-sm"
          listClassName="rw-form-error-list list-disc pl-5"
        />

        <Label
          name="title"
          className="rw-label mb-2 block text-sm font-bold text-gray-700"
          errorClassName="rw-label rw-label-error text-red-500"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.todoList?.title}
          className="rw-input focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          errorClassName="rw-input rw-input-error border-red-500"
          validation={{ required: true }}
        />

        <FieldError
          name="title"
          className="rw-field-error text-xs italic text-red-500"
        />

        <div className="mb-4">
          <h6 className="text-sm font-medium text-gray-700">Store:</h6>
          {props.stores?.map((store) => (
            <div key={store.id} className="mt-2">
              <RadioField name="storeId" value={store.id} className="mx-1" />

              <Label
                name="storeId"
                className="text-sm font-medium text-gray-700"
                errorClassName="text-sm font-medium text-red-600"
              >
                {store.name}
              </Label>

              <FieldError name="storeId" className="text-sm text-red-600" />
            </div>
          ))}
        </div>

        <div className="rw-button-group flex items-center justify-between">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TodoListForm
