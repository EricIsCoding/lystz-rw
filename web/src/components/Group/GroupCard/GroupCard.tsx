import { Link, routes } from '@redwoodjs/router'

import { truncate, timeTag } from 'src/lib/formatters'

const GroupCard = ({ group }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 hover:text-teal-900">
          <Link to={routes.group({ id: group.id })}>
            {truncate(group.name)}
          </Link>
        </h3>
        <p className="text-sm text-gray-600">ID: {truncate(group.id)}</p>
        <p className="text-sm text-gray-600">
          Description: {truncate(group.description)}
        </p>
        <p className="text-sm text-gray-600">
          Created at: {timeTag(group.createdAt)}
        </p>
      </div>
    </div>
  )
}

export default GroupCard
