import type { TodoList } from '@prisma/client'

import {
  todoLists,
  todoList,
  createTodoList,
  updateTodoList,
  deleteTodoList,
} from './todoLists'
import type { StandardScenario } from './todoLists.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('todoLists', () => {
  scenario('returns all todoLists', async (scenario: StandardScenario) => {
    const result = await todoLists()

    expect(result.length).toEqual(Object.keys(scenario.todoList).length)
  })

  scenario('returns a single todoList', async (scenario: StandardScenario) => {
    const result = await todoList({ id: scenario.todoList.one.id })

    expect(result).toEqual(scenario.todoList.one)
  })

  scenario('creates a todoList', async (scenario: StandardScenario) => {
    const result = await createTodoList({
      input: { title: 'String', userId: scenario.todoList.two.userId },
    })

    expect(result.title).toEqual('String')
    expect(result.userId).toEqual(scenario.todoList.two.userId)
  })

  scenario('updates a todoList', async (scenario: StandardScenario) => {
    const original = (await todoList({
      id: scenario.todoList.one.id,
    })) as TodoList
    const result = await updateTodoList({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a todoList', async (scenario: StandardScenario) => {
    const original = (await deleteTodoList({
      id: scenario.todoList.one.id,
    })) as TodoList
    const result = await todoList({ id: original.id })

    expect(result).toEqual(null)
  })
})
