import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type { DeleteStoreMutationVariables, FindStoreById } from 'types/graphql'

const DELETE_STORE_MUTATION = gql`
  mutation DeleteStoreMutation($id: Int!) {
    deleteStore(id: $id) {
      id
    }
  }
`

interface Props {
  store: NonNullable<FindStoreById['store']>
}

const Store = ({ store }: Props) => {
  const [deleteStore] = useMutation(DELETE_STORE_MUTATION, {
    onCompleted: () => {
      toast.success('Store deleted')
      navigate(routes.stores())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteStoreMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete store ' + id + '?')) {
      deleteStore({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Store {store.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{store.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{store.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{store.description}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(store.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editStore({ id: store.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(store.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Store
