import type { FindStores } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import StoreCard from '../StoreCard/StoreCard'

export const QUERY = gql`
  query FindStores {
    stores {
      id
      name
      description
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No stores yet. '}
      <Link to={routes.newStore()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ stores }: CellSuccessProps<FindStores>) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stores.map((store) => {
        return <StoreCard store={store} key={store.id} />
      })}
    </div>
  )
}
