// let userModel = require("./user-model.js");
// let db = require("../database/dbConfig.js");

// describe("User models", () => {
//   let userCount = 0;
//   beforeAll(async () => {
//     userCount = await (await db("users")).length;
//   });

//   test("find all users", async () => {
//     const users = await userModel.find();
//     expect(users.length).toEqual(userCount);
//     expect(users);
//   });

//   //   test("find user by id", async () => {
//   //     if (userCount > 0) {
//   //       const user = await userModel.findById(userCount - 1);
//   //       expect(user.id).toEqual(userCount - 1);
//   //     } else {
//   //       expect(user).toBeUndefined();
//   //     }
//   //   });

//   //   test("adds a user", async () => {
//   //     const newUser = {
//   //       email: String(Math.random()),
//   //       password: "secrets",
//   //       firstName: "John",
//   //       lastName: "Doe",
//   //       location: "Portland",
//   //       gender: "Male",
//   //     };
//   //     const found = await userModel.findBy({ email: newUser.email });
//   //     if (!found) {
//   //       const added = await userModel.add(newUser);
//   //       expect(userCount).toBe(userCount + 1);
//   //     }
//   //   });
// });

test("hello", () => {});
