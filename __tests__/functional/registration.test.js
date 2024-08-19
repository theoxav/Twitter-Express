const request = require("supertest");
const app = require("../../app");
const User = require("../../database/models/user.model");
const mongoose = require("mongoose");
const config = require("../../config/config");

describe("User Registration", () => {
  beforeAll(async () => {
    await mongoose.connect(config.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("should render registration form", async () => {
    const res = await request(app).get("/users/signup/form");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Inscription");
  });

  test("should register user with valid details", async () => {
    const res = await request(app).post("/users/signup").send({
      username: "newuser",
      email: "newuser@example.com",
      password: "Password123",
    });

    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe("/auth/signin/form");

    const user = await User.findOne({ email: "newuser@example.com" });
    expect(user).toBeTruthy();
    expect(user.username).toBe("newuser");
  });

  test("should not register user with missing fields", async () => {
    const res = await request(app).post("/users/signup").send({
      username: "newuser",
      email: "",
      password: "Password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.text).toContain("Le champ 'email' est requis");
  });

  test("should not register user with invalid email", async () => {
    const res = await request(app).post("/users/signup").send({
      username: "newuser",
      email: "invalid-email",
      password: "Password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.text).toContain("Le champ 'email' doit être un email valide");
  });

  test("should not register user with weak password", async () => {
    const res = await request(app).post("/users/signup").send({
      username: "newuser",
      email: "newuser@example.com",
      password: "123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.text).toContain(
      "Le champ 'password' doit contenir au moins 6 caractères"
    );
  });

  test("should not register user with existing email", async () => {
    await new User({
      username: "existinguser",
      email: "existinguser@example.com",
      password: await User.hashPassword("Password123"),
    }).save();

    const res = await request(app).post("/users/signup").send({
      username: "newuser",
      email: "existinguser@example.com",
      password: "Password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.text).toContain(
      "Email déjà utilisé. Veuillez en choisir un autre."
    );
  });
});
