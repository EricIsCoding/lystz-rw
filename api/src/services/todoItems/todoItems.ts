import type {
  QueryResolvers,
  MutationResolvers,
  TodoItemRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const todoItems: QueryResolvers['todoItems'] = () => {
  return db.todoItem.findMany()
}

export const todoItem: QueryResolvers['todoItem'] = ({ id }) => {
  return db.todoItem.findUnique({
    where: { id },
  })
}

export const createTodoItem: MutationResolvers['createTodoItem'] = ({
  input,
}) => {
  return db.todoItem.create({
    data: input,
  })
}

export const updateTodoItem: MutationResolvers['updateTodoItem'] = ({
  id,
  input,
}) => {
  return db.todoItem.update({
    data: input,
    where: { id },
  })
}

export const deleteTodoItem: MutationResolvers['deleteTodoItem'] = ({ id }) => {
  return db.todoItem.delete({
    where: { id },
  })
}

export const TodoItem: TodoItemRelationResolvers = {
  todoList: (_obj, { root }) => {
    return db.todoItem.findUnique({ where: { id: root?.id } }).todoList()
  },
}
