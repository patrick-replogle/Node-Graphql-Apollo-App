// const {
//   PubSub,
//   UserInputError,
//   AuthenticationError,
// } = require("apollo-server-express");
// const userModel = require("../users/user-model.js");
// const postModel = require("../posts/post-model.js");

// const users = (_, {}, ctx) => {
//   return userModel.find();
// };

// const user = (_, { id }, {}) => {
//   return userModel.findById(id);
// };

// const addUser = async (_, { input }, {}) => {
//   const existing = await userModel.findBy({ email: input.email }).first();
//   if (existing) {
//     throw new UserInputError("email already taken");
//   } else {
//     return userModel.add(input);
//   }
// };

// const updateUser = async (_, { id, input }, {}) => {
//   return userModel.update(id, input);
// };

// const removeUser = (_, { id }, {}) => {
//   return userModel.remove(id);
// };

// const posts = (_, __, ___) => {
//   return postModel.find();
// };

// const post = (_, { id }, ___) => {
//   return postModel.find(id);
// };

// const addPost = (_, { input }, ___) => {
//   return postModel.add(input);
// };

// const updatePost = (_, { id, input }, ___) => {
//   return postModel.update(id, input);
// };

// const removePost = (_, { id }, {}) => {
//   return postModel.remove(id);
// };

const {
  users,
  user,
  addUser,
  updateUser,
  removeUser,
} = require("../users/user-resolvers.js");

const {
  posts,
  post,
  userPosts,
  addPost,
  updatePost,
  removePost,
} = require("../posts/post-resolvers.js");

module.exports = {
  Query: {
    users,
    user,
    posts,
    post,
    userPosts,
  },
  Mutation: {
    addUser,
    updateUser,
    removeUser,
    addPost,
    updatePost,
    removePost,
  },
};
