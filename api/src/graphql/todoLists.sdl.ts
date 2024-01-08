export const schema = gql`
  type TodoList {
    id: Int!
    title: String!
    createdAt: DateTime!
    userId: Int!
    user: User!
    items: [TodoItem]!
  }

  type Query {
    todoLists: [TodoList!]! @requireAuth
    todoList(id: Int!): TodoList @requireAuth
  }

  input CreateTodoListInput {
    title: String!
  }

  input UpdateTodoListInput {
    title: String
    userId: Int
  }

  type Mutation {
    createTodoList(input: CreateTodoListInput!): TodoList! @requireAuth
    updateTodoList(id: Int!, input: UpdateTodoListInput!): TodoList!
      @requireAuth
    deleteTodoList(id: Int!): TodoList! @requireAuth
  }
`
