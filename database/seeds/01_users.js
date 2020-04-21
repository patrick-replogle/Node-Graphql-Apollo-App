exports.seed = function (knex) {
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
};
