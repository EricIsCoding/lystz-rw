import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditStoreById, UpdateStoreInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormStore = NonNullable<EditStoreById['store']>

interface StoreFormProps {
  store?: EditStoreById['store']
  onSave: (data: UpdateStoreInput, id?: FormStore['id']) => void
  error: RWGqlError
  loading: boolean
}

const StoreForm = (props: StoreFormProps) => {
  const onSubmit = (data: FormStore) => {
    props.onSave(data, props?.store?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormStore> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.store?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.store?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default StoreForm
