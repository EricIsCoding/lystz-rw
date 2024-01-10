import type { FindGroups } from 'types/graphql'

import GroupCard from '../GroupCard/GroupCard'

const GroupsList = ({ groups }: FindGroups) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  )
}

export default GroupsList
