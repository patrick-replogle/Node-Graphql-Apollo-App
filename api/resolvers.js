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
