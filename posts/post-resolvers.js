const postModel = require("./post-model.js");

const posts = (_, __, ___) => {
  return postModel.find();
};

const userPosts = (_, __, ctx) => {
  const user_id = ctx.headers.user_id;
  return postModel.findBy({ user_id });
};

const post = (_, { id }, ___) => {
  return postModel.find(id);
};

const addPost = (_, { input }, ___) => {
  return postModel.add(input);
};

const updatePost = (_, { id, input }, ___) => {
  return postModel.update(id, input);
};

const removePost = (_, { id }, {}) => {
  return postModel.remove(id);
};

module.exports = {
  posts,
  post,
  userPosts,
  addPost,
  updatePost,
  removePost,
};
