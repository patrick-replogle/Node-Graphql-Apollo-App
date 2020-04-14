const {
  PubSub,
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");
const userModel = require("./user-model.js");
const postModel = require("../posts/post-model.js");

// const users = (_, __, ___) => {
//   return userModel.find();
// };

const users = async (_, __, ___) => {
  const userList = await userModel.find();
  const data = userList.map(async (user) => {
    const post = await postModel.findBy({ user_id: user.id });
    return {
      ...user,
      posts: [...post],
    };
  });
  const users = await Promise.all(data);
  return [...users];
};

// const user = (_, { id }, {}) => {
//   return userModel.findById(id);
// };

const user = async (_, { id }, {}) => {
  const user = await userModel.findById(id);
  const posts = await postModel.findBy({ user_id: id });
  return {
    ...user,
    posts: [...posts],
  };
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
