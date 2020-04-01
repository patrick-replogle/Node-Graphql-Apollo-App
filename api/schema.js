const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    email: String
    password: String
    firstName: String
    lastName: String
    location: String
    gender: String
    created_at: String
  }

  input NewUserInput {
    id: ID
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    location: String!
    gender: String!
    created_at: String
  }

  input UpdateUserInput {
    id: ID
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    location: String!
    gender: String!
    created_at: String
  }

  type Query {
    users: [User]!
    user(id: ID!): User!
  }

  type Mutation {
    addUser(input: NewUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    removeUser(id: ID!): User!
  }
`;

module.exports = typeDefs;
