import type { Prisma, GroupMembership } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.GroupMembershipCreateArgs>({
  groupMembership: {
    one: {
      data: {
        role: 'String',
        user: {
          create: {
            email: 'String6605406',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        group: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        role: 'String',
        user: {
          create: {
            email: 'String20615',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        group: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<GroupMembership, 'groupMembership'>
