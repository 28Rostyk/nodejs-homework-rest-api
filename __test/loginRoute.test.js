const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

const { User } = require("../models/user");

const { DB_HOST_TEST, PORT } = process.env;
const registerData = {
  email: "28rost@gmail.com",
  password: "123456",
  subscription: "business",
};
const loginData = {
  email: "28rost@gmail.com",
  password: "123456",
};

// eslint-disable-next-line no-undef
describe("test /api/auth/register route", () => {
  let server = null;
  // eslint-disable-next-line no-undef
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  // eslint-disable-next-line no-undef
  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  // afterEach(async () => {
  //   await User.deleteMany({});
  // });

  test("test register route with correct data", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(registerData)
      .set("Accept", "application/json");
    // eslint-disable-next-line no-undef
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(registerData.email);
    expect(res.body.subscription).toBe(registerData.subscription);
    expect(res.body).toBeDefined();

    const user = await User.findOne({ email: registerData.email });
    expect(user.email).toBe(registerData.email);
  });

  it("should return 409 status for registration - email is already exsist", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(registerData)
      .set("Accept", "application/json");

    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();
  });

  it("should return 200 status for login", async () => {
    const res = await request(app)
      .post(`/api/auth/login`)
      .send(loginData)
      .set("Accept", "application/json");

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
  });

  it("should return 401 status for login with wrong credentials", async () => {
    const res = await request(app)
      .post(`/api/auth/login`)
      .send({ email: "qwe@gmail.com", password: "234234" })
      .set("Accept", "application/json");

    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();
  });
});

// const request = require("supertest");
// const jwt = require("jsonwebtoken");
// const fs = require("fs").promises;
// const mongoose = require("mongoose");

// require("dotenv").config();

// const { User } = require("../models/user");
// const app = require("../app");
// const { SECRET_KEY, DB_HOST_TEST, PORT } = process.env;

// const issueToken = (payload, secret) => jwt.sign(payload, secret);
// const token = issueToken({ id: User._id }, SECRET_KEY);
// User.token = token;

// // jest.mock("../model/users.js");

// describe("test /api/auth/register route", () => {
//   let server = null;
//   beforeAll(async () => {
//     server = app.listen(PORT);
//     await mongoose.connect(DB_HOST_TEST);
//   });

//   afterAll(async () => {
//     server.close();
//     await mongoose.connection.close();
//   });

//   it("should return 201 status for registration", async () => {
//     const registerData = {
//       email: "28rost@gmail.com",
//       password: "123456",
//       subscription: "pro",
//     };
//     const res = await request(app)
//       .post("/api/auth/register")
//       .send(registerData);

//     expect(res.statusCode).toBe(201);
//     expect(res.body.email).toBe(registerData.email);

//     const user = await User.findOne({ email: registerData.email });
//     expect(user.email).toBe(registerData.email);
//     // .set("Accept", "application/json");

//     // expect(res.status).toEqual(201);
//     // expect(res.body).toBeDefined();
//   });

// it("should return 409 status for registration - email is already exsist", async () => {
//   const res = await request(app)
//     .post("/api/users/registration")
//     .send(newUser)
//     .set("Accept", "application/json");

//   expect(res.status).toEqual(409);
//   expect(res.body).toBeDefined();
// });

// it("should return 200 status for login", async () => {
//   const res = await request(app)
//     .post(`/api/users/login`)
//     .send(newUser)
//     .set("Accept", "application/json");

//   expect(res.status).toEqual(200);
//   expect(res.body).toBeDefined();
// });

// it("should return 401 status for login with wrong credentials", async () => {
//   const res = await request(app)
//     .post(`/api/users/login`)
//     .send({ email: "qwe@gmail.com", password: "234234" })
//     .set("Accept", "application/json");

//   expect(res.status).toEqual(401);
//   expect(res.body).toBeDefined();
// });

// it("should return 200 status for upload avatar", async () => {
//   const buffer = await fs.readFile("./test/useravatar.jpg");
//   const res = await request(app)
//     .patch("/api/users/avatars")
//     .set("Authorization", `Bearer ${token}`)
//     .attach("avatar", buffer, "useravatar.jpg");

//   console.log("RESPONSE: ", res.body);
//   expect(res.status).toEqual(200);
//   expect(res.body).toBeDefined();
// });
// });

// // const request = require("supertest");
// const jwt = require("jsonwebtoken");
// // const fs = require("fs").promises;

// const mongoose = require("mongoose");
// const request = require("supertest");
// const app = require("../app");
// const { User } = require("../models/user");
// const SECRET_KEY = process.env;

// const { DB_HOST_TEST, PORT } = process.env;

// describe("test /api/auth/register route", () => {
//   let server = null;
//   beforeAll(async () => {
//     server = app.listen(PORT);
//     await mongoose.connect(DB_HOST_TEST);
//   });

//   afterAll(async () => {
//     server.close();
//     await mongoose.connection.close();
//   });

//   test("test login route with correct data", async () => {
//     const loginData = {
//       email: "28rost@gmail.com",
//       password: "123456",
//       subscription: "pro",
//     };
//     const res = await request(app).post("/api/auth/login").send(loginData);
//     expect(res.statusCode).toBe(201);
//     expect(res.body.email).toBe(loginData.email);
//     expect(res.body.subscription).toBe(loginData.subscription);

//     const user = await User.findOne({ email: loginData.email });
//     // expect(user.name).toBe(registerData.name);
//   });
// });
