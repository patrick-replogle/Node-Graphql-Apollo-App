exports.seed = function (knex) {
  return knex("posts").insert([
    { description: "new post", user_id: 1 },
    { description: "new new post", user_id: 1 },
    { description: "new new new post", user_id: 2 },
  ]);
};
