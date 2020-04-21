const { MockList } = require("apollo-server");

const mocks = {
  Query: () => ({
    users: () => [
      { id: "1", email: "fakeuser@gmail.com", location: "Portland" },
      { id: "2", email: "fakeuser1@gmail.com", location: "Portland" },
      { id: "3", email: "fakeuser2@gmail.com", location: "Portland" },
    ],
    user: (o, id) => {
      new MockList(id);
    },
  }),
  Int: () => 2,
  Float: () => 2.1,
};

module.exports = mocks;
