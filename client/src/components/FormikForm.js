import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { ALL_USERS } from "../graphql/querys.js";
import { NEW_USER, UPDATE_USER } from "../graphql/mutations.js";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("email required")
    .email(),
  password: Yup.string()
    .required("password required")
    .max(100)
    .min(6),

  firstName: Yup.string()
    .required("first name required")
    .max(35)
    .min(1),
  lastName: Yup.string()
    .required("last name required")
    .max(35)
    .min(1),
  location: Yup.string()
    .required("last name required")
    .max(35)
    .min(1),
  gender: Yup.string()
    .required("last name required")
    .max(35)
    .min(1)
});

const initialFormState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  location: "",
  gender: ""
};

const FormikForm = ({
  isEditing,
  setIsEditing,
  userToEdit,
  setUserToEdit,
  history
}) => {
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
  return (
    <div>
      <Formik
        initialValues={isEditing ? userToEdit : initialFormState}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting, setStatus }) => {
          setSubmitting(true);
          setStatus(false);
          if (isEditing) {
            try {
              const updated = {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName,
                location: values.location,
                gender: values.gender
              };
              await updateUser({
                variables: { id: userToEdit.id, input: updated }
              });
              setIsEditing(false);
              setUserToEdit({});
              resetForm(initialFormState);
              history.push("/");
            } catch (e) {
              console.log(e);
              setStatus(e.message.slice(14));
            }
          } else {
            try {
              await createUser({
                variables: { input: values }
              });
              resetForm(initialFormState);
              history.push("/");
            } catch (e) {
              console.log(e);
              setStatus(e.message.slice(14));
            }
          }
        }}
      >
        {({
          touched,
          handleSubmit,
          handleChange,
          values,
          errors,
          isSubmitting,
          status
        }) => (
          <form onSubmit={handleSubmit}>
            {status && <p className="status">{status}</p>}

            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={values.email}
              placeholder="email"
              required
            />
            {touched.email && errors.email && (
              <p className="errors">{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
              placeholder="password"
              required
            />
            {touched.password && errors.password && (
              <p className="errors">{errors.password}</p>
            )}

            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={values.firstName}
              placeholder="first name"
              required
            />
            {touched.firstName && errors.firstName && (
              <p className="errors">{errors.firstName}</p>
            )}

            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
              placeholder="last name"
              required
            />
            {touched.lastName && errors.lastName && (
              <p className="errors">{errors.lastName}</p>
            )}

            <input
              type="text"
              name="location"
              onChange={handleChange}
              value={values.location}
              placeholder="location"
              required
            />
            {touched.location && errors.location && (
              <p className="errors">{errors.location}</p>
            )}

            <input
              type="text"
              name="gender"
              onChange={handleChange}
              value={values.gender}
              placeholder="gender"
              required
            />
            {touched.gender && errors.gender && (
              <p className="errors">{errors.gender}</p>
            )}

            <button type="submit">Submit</button>
            {isSubmitting && <p>loading</p>}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
