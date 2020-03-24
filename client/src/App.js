import React, { useState } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Form from "./components/Form.js";
import UserCard from "./components/UserCard.js";
import NavBar from "./components/NavBar.js";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  return (
    <div className="App">
      <NavBar />
      <Route
        exact
        path="/"
        render={props => {
          return (
            <UserCard
              {...props}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              userToEdit={userToEdit}
              setUserToEdit={setUserToEdit}
            />
          );
        }}
      />

      <Route
        path="/form"
        render={props => {
          return (
            <Form
              {...props}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              userToEdit={userToEdit}
              setUserToEdit={setUserToEdit}
            />
          );
        }}
      />
    </div>
  );
}

export default App;
