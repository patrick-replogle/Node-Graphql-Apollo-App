exports.up = function (knex) {
  return knex.schema
    .createTable("users", (users) => {
      users.increments("id").primary();
      users.string("email").unique();
      users.string("password");
      users.string("firstName");
      users.string("lastName");
      users.string("location");
      users.string("gender");
      users.timestamp("created_at").defaultTo(knex.fn.now());
    })

    .createTable("posts", (posts) => {
      posts.increments("id").primary();
      posts.string("description");
      posts
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
