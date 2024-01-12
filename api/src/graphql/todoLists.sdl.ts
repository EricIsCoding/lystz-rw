export const schema = gql`
  type TodoList {
    id: Int!
    title: String!
    createdAt: DateTime!
    userId: Int!
    user: User!
    items: [TodoItem]!
    _count: TodoListCount
  }
  type Query {
    todoLists(limit: Int): [TodoList!]! @requireAuth
    todoList(id: Int!): TodoList @requireAuth
  }

  input CreateTodoListInput {
    title: String!
    storeId: Int!
  }

  input UpdateTodoListInput {
    title: String
    userId: Int
    storeId: Int
  }

  type TodoListCount {
    items: Int!
  }

  type Mutation {
    createTodoList(input: CreateTodoListInput!): TodoList! @requireAuth
    updateTodoList(id: Int!, input: UpdateTodoListInput!): TodoList!
      @requireAuth
    deleteTodoList(id: Int!): TodoList! @requireAuth
  }
`
