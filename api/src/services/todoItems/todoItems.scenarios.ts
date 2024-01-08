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
                email: 'String7347037',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        user: {
          create: {
            email: 'String6036677',
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
                email: 'String2085520',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
        user: {
          create: {
            email: 'String4988863',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<TodoItem, 'todoItem'>
