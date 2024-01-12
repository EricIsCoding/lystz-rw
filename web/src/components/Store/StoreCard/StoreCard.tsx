import { Link, routes } from '@redwoodjs/router'

import { truncate, timeTag } from 'src/lib/formatters'

const StoreCard = ({ store }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-50 shadow-lg transition-shadow duration-200 hover:shadow-xl">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 transition-colors duration-200 hover:text-teal-400">
          <Link to={routes.store({ id: store.id })}>
            {truncate(store.name)}
          </Link>
        </h3>
        <div className="mt-2 text-sm text-gray-600">
          <p>Description: {truncate(store.description)}</p>
          <p>Created at: {timeTag(store.createdAt)}</p>
        </div>
      </div>
    </div>
  )
}

export default StoreCard
