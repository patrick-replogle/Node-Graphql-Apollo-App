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
    createdAt: String
  }

  input NewUserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    location: String!
    gender: String!
  }

  input UpdateUserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    location: String!
    gender: String!
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
