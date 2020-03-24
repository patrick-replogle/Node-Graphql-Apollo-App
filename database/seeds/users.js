exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          firstName: "Patrick",
          lastName: "Replogle",
          email: "fakeuser1@gmail.com",
          location: "Portland",
          gender: "male",
          password: "password"
        }
      ]);
    });
};
