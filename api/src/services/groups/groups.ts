import type {
  QueryResolvers,
  MutationResolvers,
  GroupRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { addToGroup } from '../groupMemberships/groupMemberships'

export const groups: QueryResolvers['groups'] = () => {
  return db.group.findMany()
}

export const group: QueryResolvers['group'] = ({ id }) => {
  return db.group.findUnique({
    where: { id },
  })
}

export const createGroup: MutationResolvers['createGroup'] = async ({
  input,
}) => {
  const newGroup = await db.group.create({
    data: input,
  })

  await addToGroup({
    groupId: newGroup.id,
    userId: context.currentUser?.id || 1,
    role: 'admin',
  })

  return newGroup
}

export const updateGroup: MutationResolvers['updateGroup'] = ({
  id,
  input,
}) => {
  return db.group.update({
    data: input,
    where: { id },
  })
}

export const deleteGroup: MutationResolvers['deleteGroup'] = ({ id }) => {
  return db.group.delete({
    where: { id },
  })
}

export const Group: GroupRelationResolvers = {
  members: (_obj, { root }) => {
    return db.group.findUnique({ where: { id: root?.id } }).members()
  },
  todoLists: (_obj, { root }) => {
    return db.group.findUnique({ where: { id: root?.id } }).todoLists()
  },
}

export const userGroups = ({ userId }) => {
  return db.group.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  })
}
