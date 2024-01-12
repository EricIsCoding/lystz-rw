import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import StoreForm from 'src/components/Store/StoreForm'

import type { CreateStoreInput } from 'types/graphql'

const CREATE_STORE_MUTATION = gql`
  mutation CreateStoreMutation($input: CreateStoreInput!) {
    createStore(input: $input) {
      id
    }
  }
`

const NewStore = () => {
  const [createStore, { loading, error }] = useMutation(CREATE_STORE_MUTATION, {
    onCompleted: () => {
      toast.success('Store created')
      navigate(routes.stores())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateStoreInput) => {
    createStore({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Store</h2>
      </header>
      <div className="rw-segment-main">
        <StoreForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewStore
