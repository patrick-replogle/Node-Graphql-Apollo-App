import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ALL_USERS } from "../graphql/querys.js";
import { NEW_USER, UPDATE_USER } from "../graphql/mutations.js";

const initialFormState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  location: "",
  gender: ""
};

const Form = ({
  isEditing,
  userToEdit,
  setIsEditing,
  setUserToEdit,
  history
}) => {
  const [formInput, setFormInput] = useState(initialFormState);
  const [error, setError] = useState("");

  const [createUser] = useMutation(NEW_USER, {
    refetchQueries: [{ query: ALL_USERS }]
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      const { users } = cache.readQuery({ query: ALL_USERS });

      cache.writeQuery({
        query: ALL_USERS,
        data: { users }
      });
    }
  });

  useEffect(() => {
    if (isEditing) {
      setFormInput({
        email: userToEdit.email,
        password: userToEdit.password,
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        location: userToEdit.location,
        gender: userToEdit.gender
      });
    }
  }, [
    isEditing,
    userToEdit.email,
    userToEdit.password,
    userToEdit.firstName,
    userToEdit.lastName,
    userToEdit.location,
    userToEdit.gender
  ]);

  const handleChange = e => {
    e.preventDefault();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (isEditing) {
      try {
        await updateUser({
          variables: { id: userToEdit.id, input: formInput }
        });
        setIsEditing(false);
        setFormInput(initialFormState);
        setUserToEdit({});
        history.push("/");
      } catch (e) {
        console.log(e);
        setError(e.message.slice(14));
      }
    } else {
      try {
        await createUser({
          variables: { input: formInput }
        });
        setFormInput(initialFormState);
        history.push("/");
      } catch (e) {
        console.log(e);
        setError(e.message.slice(14));
      }
    }
  };

  return (
    <>
      {isEditing ? <p>Edit a User</p> : <p>Add a User</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={formInput.email}
          placeholder="email"
          required
        />
        <input
          type="text"
          name="password"
          onChange={handleChange}
          value={formInput.password}
          placeholder="password"
          required
        />
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          value={formInput.firstName}
          placeholder="firstName"
          required
        />
        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          value={formInput.lastName}
          placeholder="lastName"
          required
        />

        <input
          type="text"
          name="location"
          onChange={handleChange}
          value={formInput.location}
          placeholder="location"
          required
        />
        <input
          type="text"
          name="gender"
          onChange={handleChange}
          value={formInput.gender}
          placeholder="gender"
          required
        />
        <button>submit</button>
        <button
          onClick={() => {
            setFormInput(initialFormState);
            setIsEditing(false);
            setUserToEdit({});
            history.push("/");
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default Form;
