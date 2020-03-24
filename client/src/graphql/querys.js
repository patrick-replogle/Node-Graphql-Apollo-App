import gql from "graphql-tag";

export const ALL_USERS = gql`
  query users {
    users {
      id
      email
      password
      firstName
      lastName
      createdAt
      location
      gender
    }
  }
`;
