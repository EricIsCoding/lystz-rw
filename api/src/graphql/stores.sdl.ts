export const schema = gql`
  type Store {
    id: Int!
    name: String!
    description: String
    createdAt: DateTime!
    todoLists: [TodoList]!
  }

  type Query {
    stores: [Store!]! @requireAuth
    store(id: Int!): Store @requireAuth
  }

  input CreateStoreInput {
    name: String!
    description: String
  }

  input UpdateStoreInput {
    name: String
    description: String
  }

  type Mutation {
    createStore(input: CreateStoreInput!): Store! @requireAuth
    updateStore(id: Int!, input: UpdateStoreInput!): Store! @requireAuth
    deleteStore(id: Int!): Store! @requireAuth
  }
`
