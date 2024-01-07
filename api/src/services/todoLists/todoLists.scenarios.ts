import type { Prisma, TodoList } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TodoListCreateArgs>({
  todoList: {
    one: {
      data: {
        title: 'String',
        user: {
          create: {
            email: 'String6740998',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        user: {
          create: {
            email: 'String6411734',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<TodoList, 'todoList'>
