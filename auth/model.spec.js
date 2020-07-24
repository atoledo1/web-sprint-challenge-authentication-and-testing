const supertest = require("supertest");

const dbConfig = require("../database/dbConfig");
const server = require("../api/server");

describe("auth-router endpoints", () => {
  beforeAll(async () => {
    await dbConfig("users").truncate();
  });

  describe("POST Register", () => {
    it("register user", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({ username: "adriana", password: "12345" })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });

    it("should throw error 401", () => {
      return supertest(server)
        .post("/api/auth/register")
        .send({ username: "adriana1", password: "" })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
  });

  describe("POST Login", () => {
    it("checks if success message appears", () => {
      const username = "adriana";
      const password = "12345";

      return supertest(server)
        .post("/api/auth/login")
        .send({ username: username, password: password })
        .then((res) => {
          expect(res.body).toHaveProperty("message");
        });
    });
    it("should throw a 401", () => {
      return supertest(server)
        .post("/api/auth/login")
        .send({ username: "", password: "1234" })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
  });
});
