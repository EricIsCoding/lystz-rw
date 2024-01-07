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
                email: 'String908242',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
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
                email: 'String3003967',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<TodoItem, 'todoItem'>
