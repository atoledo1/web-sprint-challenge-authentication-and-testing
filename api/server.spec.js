const supertest = require("supertest");

const server = require("./server.js");

describe("server", function () {
  it("runs tests", function () {
    expect(true).toBe(true);
  });

  describe("GET /", function () {
    it("gives 200 code", function () {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it("gives JSON", function () {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("api: 'up'", function () {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.body.api).toBe("up");
        });
    });
  });
});
