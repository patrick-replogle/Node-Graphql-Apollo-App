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

const Form = props => {
  const [formInput, setFormInput] = useState(initialFormState);
  const [error, setError] = useState("");

  const [createUser] = useMutation(NEW_USER, {
    refetchQueries: [{ query: ALL_USERS }]
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: ALL_USERS }]
  });

  useEffect(() => {
    if (props.isEditing) {
      setFormInput({
        email: props.userToEdit.email,
        password: props.userToEdit.password,
        firstName: props.userToEdit.firstName,
        lastName: props.userToEdit.lastName,
        location: props.userToEdit.location,
        gender: props.userToEdit.gender
      });
    }
  }, [props.isEditing, props.userToEdit]);

  const handleChange = e => {
    e.preventDefault();
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (props.isEditing) {
      try {
        const { data } = await updateUser({
          variables: { id: props.userToEdit.id, input: formInput }
        });
        setFormInput(initialFormState);
        props.setUserToEdit({});
        props.setIsEditing(false);
        props.history.push("/");
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    } else {
      try {
        const { data } = await createUser({
          variables: { input: formInput }
        });
        setFormInput(initialFormState);
        props.history.push("/");
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    }
  };

  return (
    <>
      {props.isEditing ? <p>Edit a User</p> : <p>Add a User</p>}
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
          name="password"
          onChange={handleChange}
          value={formInput.password}
          placeholder="password"
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
            props.setIsEditing(false);
            props.setUserToEdit({});
            props.history.push("/");
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default Form;
