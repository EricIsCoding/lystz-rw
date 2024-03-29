import type {
  EditTodoItemById,
  UpdateTodoItemInput,
  TodoList,
} from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
  RadioField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormTodoItem = NonNullable<EditTodoItemById['todoItem']>

interface TodoItemFormProps {
  todoItem?: EditTodoItemById['todoItem']
  onSave: (data: UpdateTodoItemInput, id?: FormTodoItem['id']) => void
  error: RWGqlError
  loading: boolean
  todoLists: TodoList[]
}

const TodoItemForm = (props: TodoItemFormProps) => {
  const onSubmit = (data: FormTodoItem) => {
    const intParsedData = { ...data, todoListId: parseInt(data.todoListId) }
    props.onSave(intParsedData, props?.todoItem?.id)
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <Form<FormTodoItem> onSubmit={onSubmit} error={props.error}>
        {/* FormError component if needed */}
        <FormError
          error={props.error}
          wrapperClassName="mb-4"
          titleClassName="text-sm font-medium text-red-600"
          listClassName="text-sm font-medium text-red-600"
        />

        <div className="mb-4">
          <Label
            name="text"
            className="block text-sm font-medium text-gray-700"
            errorClassName="text-sm font-medium text-red-600"
          >
            Title
          </Label>
          <TextField
            name="text"
            defaultValue={props.todoItem?.text}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            errorClassName="border-red-500"
            validation={{ required: true }}
          />
          <FieldError name="text" className="text-sm text-red-600" />
        </div>

        <div className="mb-4">
          <Label
            name="description"
            className="block text-sm font-medium text-gray-700"
            errorClassName="text-sm font-medium text-red-600"
          >
            Description
          </Label>
          <TextField
            name="description"
            defaultValue={props.todoItem?.text}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            errorClassName="border-red-500"
            validation={{ required: false }}
          />
          <FieldError name="text" className="text-sm text-red-600" />
        </div>

        <div className="mb-4">
          <Label
            name="isDone"
            className="block text-sm font-medium text-gray-700"
            errorClassName="text-sm font-medium text-red-600"
          >
            Is done
          </Label>
          <CheckboxField
            name="isDone"
            defaultChecked={props.todoItem?.isDone}
            className="mt-1"
            errorClassName="text-red-500"
          />
          <FieldError name="isDone" className="text-sm text-red-600" />
        </div>

        <div className="mb-4">
          <h6 className="text-sm font-medium text-gray-700">Todo List:</h6>
          {props.todoLists?.map((list) => (
            <div key={list.id} className="mt-2">
              <Label
                name="todoListId"
                className="text-sm font-medium text-gray-700"
                errorClassName="text-sm font-medium text-red-600"
              >
                {list.title}
              </Label>
              <RadioField name="todoListId" value={list.id} className="mt-1" />
              <FieldError name="todoListId" className="text-sm text-red-600" />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Submit
            disabled={props.loading}
            className="inline-flex justify-center rounded-md border border-transparent bg-teal-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TodoItemForm
