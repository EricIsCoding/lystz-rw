import type { Group } from '@prisma/client'

import { groupMembers } from '../groupMemberships/groupMemberships'
import type { StandardScenario as UserScenario } from '../users/users.scenarios'

import { groups, group, createGroup, updateGroup, deleteGroup } from './groups'
import type { StandardScenario } from './groups.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('groups', () => {
  scenario('returns all groups', async (scenario: StandardScenario) => {
    const result = await groups()

    expect(result.length).toEqual(Object.keys(scenario.group).length)
  })

  scenario('returns a single group', async (scenario: StandardScenario) => {
    const result = await group({ id: scenario.group.one.id })

    expect(result).toEqual(scenario.group.one)
  })

  scenario('creates a group', async () => {
    const result = await createGroup({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario(
    'creates a group and adds creator as a member',
    async (scenario: UserScenario) => {
      // Assuming you have a test user set up in your scenario
      const testUserId = scenario.user // Replace with your actual user ID setup

      const groupInput = {
        name: 'Test Group',
      }

      const newGroup = await createGroup({ input: groupInput })

      // Fetch the members of the new group
      const members = await groupMembers({ groupId: newGroup.id })

      // Check if the test user is among the members
      const isCreatorMember = members.some(
        (member) => member.userId === testUserId
      )

      expect(isCreatorMember).toBe(true)
    }
  )

  scenario('updates a group', async (scenario: StandardScenario) => {
    const original = (await group({ id: scenario.group.one.id })) as Group
    const result = await updateGroup({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a group', async (scenario: StandardScenario) => {
    const original = (await deleteGroup({ id: scenario.group.one.id })) as Group
    const result = await group({ id: original.id })

    expect(result).toEqual(null)
  })
})
