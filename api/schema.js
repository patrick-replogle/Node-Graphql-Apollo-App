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
    posts: [Post]
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

  type Post {
    id: ID
    user_id: Int
    description: String
  }

  input NewPostInput {
    id: ID
    description: String
  }

  input UpdatePostInput {
    id: ID
    description: String
  }

  type Query {
    users: [User]!
    user(id: ID!): User!
    userPosts: [Post]
    posts: [Post]!
    post(id: ID!): Post!
  }

  type Mutation {
    addUser(input: NewUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    removeUser(id: ID!): User!
    addPost(input: NewPostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    removePost(id: ID!): Post!
  }
`;

module.exports = typeDefs;
