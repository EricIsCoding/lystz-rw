import type {
  QueryResolvers,
  MutationResolvers,
  GroupMembershipRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { group } from '../groups/groups'

export const groupMemberships: QueryResolvers['groupMemberships'] = () => {
  return db.groupMembership.findMany()
}

export const groupMembership: QueryResolvers['groupMembership'] = ({ id }) => {
  return db.groupMembership.findUnique({
    where: { id },
  })
}

export const createGroupMembership: MutationResolvers['createGroupMembership'] =
  ({ input }) => {
    return db.groupMembership.create({
      data: input,
    })
  }

export const updateGroupMembership: MutationResolvers['updateGroupMembership'] =
  ({ id, input }) => {
    return db.groupMembership.update({
      data: input,
      where: { id },
    })
  }

export const deleteGroupMembership: MutationResolvers['deleteGroupMembership'] =
  ({ id }) => {
    return db.groupMembership.delete({
      where: { id },
    })
  }

export const GroupMembership: GroupMembershipRelationResolvers = {
  user: (_obj, { root }) => {
    return db.groupMembership.findUnique({ where: { id: root?.id } }).user()
  },
  group: (_obj, { root }) => {
    return db.groupMembership.findUnique({ where: { id: root?.id } }).group()
  },
}

export const addToGroup = async ({ groupId, userId, role = 'member' }) => {
  const membership = await db.groupMembership.findFirst({
    where: {
      groupId,
      userId,
    },
  })

  if (membership !== null) {
    throw new Error('Already a member of this group!')
  }

  return await db.groupMembership.create({
    data: {
      groupId,
      userId,
      role, // Default role could be 'member'
    },
  })
}

export const removeFromGroup = ({ groupId, userId }) => {
  return db.groupMembership.deleteMany({
    where: {
      groupId,
      userId,
    },
  })
}

export const groupMembers = ({ groupId }) => {
  return db.groupMembership.findMany({
    where: { groupId },
    include: { user: true },
  })
}
