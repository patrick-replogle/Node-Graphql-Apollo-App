exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("posts").insert([
        { description: "new post", user_id: 1 },
        { description: "new new post", user_id: 1 },
        { description: "new new new post", user_id: 2 },
      ]);
    });
};
