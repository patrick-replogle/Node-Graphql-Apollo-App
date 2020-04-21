let userModel = require("./user-model.js");
let db = require("../database/dbConfig.js");

const newUser = {
  email: String(Math.random()),
  password: "secret",
  firstName: "John",
  lastName: "Doe",
  location: "Portland",
  gender: "male",
};

const updatedUser = {
  email: String(Math.random()),
  password: "stillsecret",
  firstName: "Jane",
  lastName: "Doe",
  location: "Boston",
  gender: "female",
};

describe("User models", () => {
  let createdUserId = 0;
  let userCount = 0;
  beforeAll(async () => {
    userCount = await (await db("users")).length;
  });

  test("find all users", async () => {
    const users = await userModel.find();
    expect(users.length).toEqual(userCount);
  });

  test("adds a user", async () => {
    const added = await userModel.add(newUser);
    createdUserId = added.id;
    const users = await db("users").select();
    expect(users).toHaveLength(userCount + 1);
  });

  test("find user by id", async () => {
    const user = await userModel.findById(createdUserId);
    expect(user.firstName).toEqual("John");
  });

  test("added user is updated", async () => {
    const updated = await userModel.update(createdUserId, updatedUser);
    expect(updated.firstName).toBe("Jane");
  });

  test("removes the added user", async () => {
    const deleted = await userModel.remove(createdUserId);
    const users = await db("users");
    expect(users).toHaveLength(userCount);
  });
});
