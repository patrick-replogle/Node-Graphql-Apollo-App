import gql from "graphql-tag";

export const NEW_USER = gql`
  mutation addUser($input: NewUserInput!) {
    addUser(input: $input) {
      firstName
      lastName
      password
      email
      location
      gender
    }
  }
`;

export const DELETE_USER = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      firstName
      lastName
      password
      email
      location
      gender
      created_at
    }
  }
`;
