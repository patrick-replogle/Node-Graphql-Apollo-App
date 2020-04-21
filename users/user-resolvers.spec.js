const mocks = require("../api/mocks.js");
const typeDefs = require("../api/schema.js");
const resolvers = require("../api/resolvers.js");
const EasyGraphQLTester = require("easygraphql-tester");
const supertest = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

// const ALL_USERS = `
//     query users {
//         users {
//             id
//             email
//             location
//         }
//     }
// `;

const ALL_USERS = {
  query: `query users {
      users {
        id
        email
        password
        firstName
        lastName
        created_at
        location
        gender
      }
    }
  `,
  operationName: "users",
};

let USER = {
  query: `query user($id: ID!) {
    user(id:$id) {
        id
        email
        password
        firstName
        lastName
        created_at
        location
        gender
        posts {
            description
        }
    }
  }`,
  operationName: "user",
  variables: {
    id: 1,
  },
};

const NEW_USER = {
  query: `mutation addUser($input: NewUserInput!) {
        addUser(input: $input) {
            id
            firstName
            lastName
            password
            email
            location
            gender
        }
    }
`,
  operationName: "addUser",
  variables: {
    input: {
      firstName: "test",
      lastName: "test",
      password: "test",
      email: "testd",
      location: "test",
      gender: "test",
    },
  },
};

describe("user resolvers", () => {
  let createdUserId = 0;
  beforeEach(async () => {
    data = await resolvers.Query.users(ALL_USERS);
    tester = new EasyGraphQLTester(typeDefs);
  });
  beforeEach(async () => {
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

  test("users", async () => {
    const result = await mocks.Query().users(ALL_USERS);
    expect(result.length).toBe(3);
    expect(result[0].email).toEqual("fakeuser@gmail.com");
  });

  test("user mock", async () => {
    const result = await mocks.Query().user(USER);
  });

  test("users", async () => {
    const users = await resolvers.Query.users(ALL_USERS);
    if (users.length > 0) {
      expect(users.length).toEqual(data.length);
    }
  });

  //using supertest
  test("create a user", async () => {
    const res = await supertest(server).post("/graphql").send(NEW_USER);
    let parsed = JSON.parse(res.text);
    let id = Number(parsed.data.addUser.id);
    createdUserId += id;
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(parsed.data.addUser.firstName).toBe("test");
  });

  test("user is updated", async () => {
    const UPDATE_USER = {
      query: `mutation updateUser($id: ID!, $input: UpdateUserInput!) {
        updateUser(id: $id, input: $input) {
          firstName
          lastName
          password
          email
          location
          gender
      }
    }`,
      operationName: "updateUser",
      variables: {
        id: 1,
        input: {
          firstName: "updated",
          lastName: "updated",
          password: "updated",
          email: "updated",
          location: "updated",
          gender: "updated",
        },
      },
    };

    const res = await supertest(server).post("/graphql").send(UPDATE_USER);
    let parsed = JSON.parse(res.text);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(parsed.data.updateUser.firstName).toBe("updated");
  });

  test("created user is deleted", async () => {
    const DELETE_USER = {
      query: ` mutation removeUser($id: ID!) {
                removeUser(id: $id) {
                id
              }
            }`,
      operationName: "removeUser",
      variables: {
        id: createdUserId,
      },
    };

    const res = await supertest(server).post("/graphql").send(DELETE_USER);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });
});
