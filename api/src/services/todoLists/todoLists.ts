import type {
  QueryResolvers,
  MutationResolvers,
  TodoListRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const todoLists: QueryResolvers['todoLists'] = () => {
  return db.todoList.findMany({
    where: { userId: context.currentUser.id },
  })
}

export const todoList: QueryResolvers['todoList'] = ({ id }) => {
  return db.todoList.findUnique({
    where: { id },
  })
}

export const createTodoList: MutationResolvers['createTodoList'] = ({
  input,
}) => {
  return db.todoList.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

export const updateTodoList: MutationResolvers['updateTodoList'] = ({
  id,
  input,
}) => {
  return db.todoList.update({
    data: input,
    where: { id },
  })
}

export const deleteTodoList: MutationResolvers['deleteTodoList'] = ({ id }) => {
  return db.todoList.delete({
    where: { id },
  })
}

export const TodoList: TodoListRelationResolvers = {
  user: (_obj, { root }) => {
    return db.todoList.findUnique({ where: { id: root?.id } }).user()
  },
  items: (_obj, { root }) => {
    return db.todoList.findUnique({ where: { id: root?.id } }).items()
  },
}
