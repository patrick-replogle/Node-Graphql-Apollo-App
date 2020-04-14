const {
  PubSub,
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");
const userModel = require("./user-model.js");

const users = (_, {}, ctx) => {
  return userModel.find();
};

const user = (_, { id }, {}) => {
  return userModel.findById(id);
};

const addUser = async (_, { input }, {}) => {
  const existing = await userModel.findBy({ email: input.email }).first();
  if (existing) {
    throw new UserInputError("email already taken");
  } else {
    return userModel.add(input);
  }
};

const updateUser = async (_, { id, input }, {}) => {
  return userModel.update(id, input);
};

const removeUser = (_, { id }, {}) => {
  return userModel.remove(id);
};

module.exports = {
  users,
  user,
  addUser,
  updateUser,
  removeUser,
};
