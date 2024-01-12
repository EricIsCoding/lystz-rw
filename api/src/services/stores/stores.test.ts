import type { Store } from '@prisma/client'

import { stores, store, createStore, updateStore, deleteStore } from './stores'
import type { StandardScenario } from './stores.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('stores', () => {
  scenario('returns all stores', async (scenario: StandardScenario) => {
    const result = await stores()

    expect(result.length).toEqual(Object.keys(scenario.store).length)
  })

  scenario('returns a single store', async (scenario: StandardScenario) => {
    const result = await store({ id: scenario.store.one.id })

    expect(result).toEqual(scenario.store.one)
  })

  scenario('creates a store', async () => {
    const result = await createStore({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a store', async (scenario: StandardScenario) => {
    const original = (await store({ id: scenario.store.one.id })) as Store
    const result = await updateStore({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a store', async (scenario: StandardScenario) => {
    const original = (await deleteStore({ id: scenario.store.one.id })) as Store
    const result = await store({ id: original.id })

    expect(result).toEqual(null)
  })
})
