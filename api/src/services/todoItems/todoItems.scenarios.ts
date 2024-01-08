import type { Prisma, TodoItem } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TodoItemCreateArgs>({
  todoItem: {
    one: {
      data: {
        text: 'String',
        todoList: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String7353746',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        user: {
          create: {
            email: 'String6099108',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        text: 'String',
        todoList: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String182424',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        user: {
          create: {
            email: 'String9999807',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<TodoItem, 'todoItem'>
