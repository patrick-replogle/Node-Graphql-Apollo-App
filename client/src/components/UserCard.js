import React from "react";
import moment from "moment";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ALL_USERS } from "../graphql/querys.js";
import { DELETE_USER } from "../graphql/mutations.js";

const UserCard = props => {
  const usersList = useQuery(ALL_USERS);
  console.log(usersList.data);

  const [deletedUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: ALL_USERS }]
  });

  const deleteUser = id => {
    deletedUser({
      variables: { id: id }
    });
  };

  const handleEdit = user => {
    props.setUserToEdit(user);
    props.setIsEditing(true);
    props.history.push("/formik_form");
  };

  if (usersList.loading) {
    return <p>...loading</p>;
  }

  if (usersList.error) {
    return <p>error!</p>;
  }
  return (
    <div>
      {usersList.data.users.map(user => {
        return (
          <div key={user.id} className="userCard">
            <p>{user.email}</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.location}</p>
            <p>{user.gender}</p>
            <p>{moment(Number(user.created_at)).format("LL")}</p>
            <button
              onClick={e => {
                e.preventDefault();
                deleteUser(user.id);
              }}
            >
              Delete
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                handleEdit(user);
              }}
            >
              Edit
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
