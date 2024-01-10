import type { DeleteGroupMutationVariables, FindGroupById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: Int!) {
    deleteGroup(id: $id) {
      id
    }
  }
`

interface Props {
  group: NonNullable<FindGroupById['group']>
}

const Group = ({ group }: Props) => {
  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('Group deleted')
      navigate(routes.groups())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteGroupMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete group ' + id + '?')) {
      deleteGroup({ variables: { id } })
    }
  }

  return (
    <>
      <div className="m-1 overflow-hidden rounded-lg bg-white shadow-md">
        <header className="bg-gray-50 px-4 py-5 sm:px-6">
          <h2 className="text-xl font-semibold leading-6 text-gray-800">
            {truncate(group.name)}
          </h2>
        </header>
        <div className="border-t border-gray-200">
          <dl>
            {/* Group Description */}
            <div className="grid grid-cols-1 gap-4 bg-white px-4 py-5 sm:px-6 md:grid-cols-3">
              <dt className="text-sm font-semibold text-gray-600">
                Description
              </dt>
              <dd className="mt-1 text-sm text-gray-900 md:col-span-2 md:mt-0">
                {group.description}
              </dd>
            </div>

            {/* Created At */}
            <div className="grid grid-cols-1 gap-4 bg-gray-50 px-4 py-5 sm:px-6 md:grid-cols-3">
              <dt className="text-sm font-semibold text-gray-600">
                Created at
              </dt>
              <dd className="mt-1 text-sm text-gray-900 md:col-span-2 md:mt-0">
                {timeTag(group.createdAt)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Action Buttons */}
      <nav className="mt-4 flex items-center justify-between">
        <Link
          to={routes.editGroup({ id: group.id })}
          className="inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-blue-700"
        >
          Edit
        </Link>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-red-700"
          onClick={() => onDeleteClick(group.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Group
