import type {
  QueryResolvers,
  MutationResolvers,
  StoreRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const stores: QueryResolvers['stores'] = () => {
  return db.store.findMany()
}

export const store: QueryResolvers['store'] = ({ id }) => {
  return db.store.findUnique({
    where: { id },
  })
}

export const createStore: MutationResolvers['createStore'] = ({ input }) => {
  return db.store.create({
    data: input,
  })
}

export const updateStore: MutationResolvers['updateStore'] = ({
  id,
  input,
}) => {
  return db.store.update({
    data: input,
    where: { id },
  })
}

export const deleteStore: MutationResolvers['deleteStore'] = ({ id }) => {
  return db.store.delete({
    where: { id },
  })
}

export const Store: StoreRelationResolvers = {
  todoLists: (_obj, { root }) => {
    return db.store.findUnique({ where: { id: root?.id } }).todoLists()
  },
}
