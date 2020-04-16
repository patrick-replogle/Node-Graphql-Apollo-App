const {
  PubSub,
  UserInputError,
  AuthenticationError,
} = require("apollo-server-express");
const userModel = require("./user-model.js");
const postModel = require("../posts/post-model.js");

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

const user = async (_, { id }, ___) => {
  const user = await userModel.findById(id);
  const posts = await postModel.findBy({ user_id: id });
  if (user) {
    return {
      ...user,
      posts: [...posts],
    };
  } else {
    throw new Error("Specified user id does not exist");
  }
};

const addUser = async (_, { input }, ___) => {
  const existing = await userModel.findBy({ email: input.email }).first();
  if (existing) {
    throw new UserInputError("email already taken");
  } else {
    return userModel.add(input);
  }
};

const updateUser = async (_, { id, input }, ___) => {
  return userModel.update(id, input);
};

const removeUser = (_, { id }, ___) => {
  return userModel.remove(id);
};

module.exports = {
  users,
  user,
  addUser,
  updateUser,
  removeUser,
};

///
