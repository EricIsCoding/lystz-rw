export const schema = gql`
  type Group {
    id: Int!
    name: String!
    description: String
    createdAt: DateTime!
    members: [GroupMembership]!
    todoLists: [TodoList]!
  }

  type Query {
    groups: [Group!]! @requireAuth
    group(id: Int!): Group @requireAuth
  }

  input CreateGroupInput {
    name: String!
    description: String
  }

  input UpdateGroupInput {
    name: String
    description: String
  }

  type Mutation {
    createGroup(input: CreateGroupInput!): Group! @requireAuth
    updateGroup(id: Int!, input: UpdateGroupInput!): Group! @requireAuth
    deleteGroup(id: Int!): Group! @requireAuth
  }
`
