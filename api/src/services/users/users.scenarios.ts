import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        id: 1,
        email: 'String9934409',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        id: 2,
        email: 'String4621124',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
