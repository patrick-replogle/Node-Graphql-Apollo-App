import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ALL_USERS } from "../graphql/querys.js";
import { DELETE_USER } from "../graphql/mutations.js";

const UserCard = props => {
  const usersList = useQuery(ALL_USERS);
  const [delUser, removedUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: ALL_USERS }]
  });

  const deleteUser = id => {
    delUser({
      variables: { id: id }
    });
  };

  const handleEdit = user => {
    props.setUserToEdit(user);
    props.setIsEditing(true);
    props.history.push("/form");
  };

  if (usersList.loading || removedUser.loading) {
    return <p>...loading</p>;
  }

  if (usersList.error || removedUser.error) {
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
