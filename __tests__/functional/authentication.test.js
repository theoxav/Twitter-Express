const request = require("supertest");
const app = require("../../app");
const User = require("../../database/models/user.model");
const mongoose = require("mongoose");
const config = require("../../config/config");

describe("Authentication", () => {
  beforeAll(async () => {
    await mongoose.connect(config.MONGODB_URI);

    await User.deleteMany({});
    const hashedPassword = await User.hashPassword("Azerty10");
    await new User({
      username: "testuser",
      email: "testuser@example.com",
      password: hashedPassword,
    }).save();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
  });

  test("should render signin form", async () => {
    const res = await request(app).get("/auth/signin/form");

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain(
      '<form class="card" method="post" action="/auth/signin" id="auth-form">'
    );
  });

  test("should sign in user with correct credentials", async () => {
    const res = await request(app).post("/auth/signin").send({
      email: "testuser@example.com",
      password: "Azerty10",
    });

    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe("/tweets");
  });

  test("should not sign in user with incorrect credentials", async () => {
    const res = await request(app).post("/auth/signin").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Identifiant ou Mot de passe incorrect");
  });
});
