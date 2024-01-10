export const schema = gql`
  type GroupMembership {
    id: Int!
    userId: Int!
    groupId: Int!
    role: String!
    user: User!
    group: Group!
  }

  type Query {
    groupMemberships: [GroupMembership!]! @requireAuth
    groupMembership(id: Int!): GroupMembership @requireAuth
  }

  input CreateGroupMembershipInput {
    userId: Int!
    groupId: Int!
    role: String!
  }

  input UpdateGroupMembershipInput {
    userId: Int
    groupId: Int
    role: String
  }

  type Mutation {
    createGroupMembership(input: CreateGroupMembershipInput!): GroupMembership!
      @requireAuth
    updateGroupMembership(
      id: Int!
      input: UpdateGroupMembershipInput!
    ): GroupMembership! @requireAuth
    deleteGroupMembership(id: Int!): GroupMembership! @requireAuth
  }

  type AddToGroupInput {
    groupId: Int!
    userId: Int!
    role: String!
  }
`
