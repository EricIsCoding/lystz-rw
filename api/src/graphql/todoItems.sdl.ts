export const schema = gql`
  type TodoItem {
    id: Int!
    text: String!
    isDone: Boolean!
    createdAt: DateTime!
    todoListId: Int!
    todoList: TodoList!
    userId: Int!
    user: User!
  }

  type Query {
    todoItems: [TodoItem!]! @requireAuth
    todoItem(id: Int!): TodoItem @requireAuth
  }

  input CreateTodoItemInput {
    text: String!
    isDone: Boolean!
    todoListId: Int!
  }

  input UpdateTodoItemInput {
    text: String
    isDone: Boolean
    todoListId: Int
  }

  type Mutation {
    createTodoItem(input: CreateTodoItemInput!): TodoItem! @requireAuth
    updateTodoItem(id: Int!, input: UpdateTodoItemInput!): TodoItem!
      @requireAuth
    deleteTodoItem(id: Int!): TodoItem! @requireAuth
  }
`
