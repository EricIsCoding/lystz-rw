import type { FindStoreById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Store from 'src/components/Store/Store'

export const QUERY = gql`
  query FindStoreById($id: Int!) {
    store: store(id: $id) {
      id
      name
      description
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Store not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ store }: CellSuccessProps<FindStoreById>) => {
  return <Store store={store} />
}
