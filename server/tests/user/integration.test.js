const request = require("supertest");
const app = require("../../app");
const { getUserDefaultResponse } = require("./dataUtils");

const { resetTestDb, defaultAuth, alternateAuth } = require("../utils");

describe("Test the cart path", () => {
  beforeEach(() => {
    resetTestDb();
  });

  describe("GET method", () => {
    test("It should respond with the user's info if they're in the database", async () => {
      const expectedBody = getUserDefaultResponse;

      const response = await request(app)
        .get("/user")
        .set("Authorization", defaultAuth);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedBody);
    });

    test("It should respond null if the user is not in the database", async () => {
      const expectedBody = "";

      const response = await request(app)
        .get("/cart")
        .set("Authorization", alternateAuth);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedBody);
    });

    test("It should respond with error if there is no auth", async () => {
      const expectedBody = { message: "Invalid token specified" };

      const response = await request(app).get("/cart");

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(expectedBody);
    });
  });
});
