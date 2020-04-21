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

const user = async (_, args, ___) => {
  const user = await userModel.findById(args.id);
  const posts = await postModel.findBy({ user_id: args.id });
  if (user) {
    return {
      ...user,
      posts: [...posts],
    };
  } else {
    throw new Error("Specified user id does not exist");
  }
};

const addUser = async (_, args, ___) => {
  const existing = await userModel.findBy({ email: args.input.email }).first();
  if (existing) {
    throw new UserInputError("email already taken");
  } else {
    return userModel.add(args.input);
  }
};

const updateUser = async (_, args, ___) => {
  const user = await userModel.findById(args.id);
  if (!user) {
    throw new Error("The specified user id does not exist");
  } else {
    return userModel.update(args.id, args.input);
  }
};

const removeUser = async (_, args, ___) => {
  const user = await userModel.findById(args.id);
  if (!user) {
    throw new Error("The specified user id does not exist");
  } else {
    return userModel.remove(args.id);
  }
};

module.exports = {
  users,
  user,
  addUser,
  updateUser,
  removeUser,
};
