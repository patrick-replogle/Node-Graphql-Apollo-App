import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const ALL_USERS = gql`
  query users {
    users {
      id
      email
      password
      firstName
      lastName
      createdAt
      location
    }
  }
`;

const NEW_USER = gql`
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

const initialFormState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  location: "",
  gender: ""
};

const UserCard = () => {
  const [formInput, setFormInput] = useState(initialFormState);
  const usersList = useQuery(ALL_USERS);
  const [createUser, newUser] = useMutation(NEW_USER, {
    refetchQueries: [{ query: ALL_USERS }]
  });

  const handleChange = e => {
    e.preventDefault();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formInput !== initialFormState) {
      createUser({
        variables: { input: formInput }
      });
      setFormInput(initialFormState);
    } else {
      console.log("nope");
    }
  };

  if (usersList.loading || newUser.loading) {
    return <p>...loading</p>;
  }

  if (usersList.error || newUser.error) {
    return <p>error!</p>;
  }
  return (
    <div>
      <h1>Add A New User</h1>
      <>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={formInput.email}
            placeholder="email"
          />
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formInput.firstName}
            placeholder="firstName"
          />
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formInput.lastName}
            placeholder="lastName"
          />
          <input
            type="text"
            name="password"
            onChange={handleChange}
            value={formInput.password}
            placeholder="password"
          />
          <input
            type="text"
            name="location"
            onChange={handleChange}
            value={formInput.location}
            placeholder="location"
          />
          <input
            type="text"
            name="gender"
            onChange={handleChange}
            value={formInput.gender}
            placeholder="gender"
          />
          <button>submit</button>
        </form>
      </>
      {usersList.data.users.map(user => {
        return (
          <div key={user.id}>
            <p>{user.email}</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.location}</p>
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
