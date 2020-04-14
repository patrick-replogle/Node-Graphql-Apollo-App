exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          firstName: "Jane",
          lastName: "Doe",
          email: "fakeuser1@gmail.com",
          location: "Portland",
          gender: "Female",
          password: "password",
        },
        {
          firstName: "Joe",
          lastName: "Doe",
          email: "fakeuser2@gmail.com",
          location: "Portland",
          gender: "male",
          password: "password",
        },
      ]);
    });
};
