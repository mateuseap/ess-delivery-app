const request = require("supertest");
const app = require("../../app");
const { getRestaurantDefaultResponse } = require("./dataUtils");

const { resetTestDb, defaultAuth, alternateAuth } = require("../utils");

describe("Test the cart path", () => {
  beforeEach(() => {
    resetTestDb();
  });

  afterAll(() => {
    resetTestDb();
  });

  describe("GET method", () => {
    test("It should return the restaurant if pass an id", async () => {
      const expectedBody = getRestaurantDefaultResponse;

      const response = await request(app)
        .get("/restaurants?id=0")
        .set("Authorization", defaultAuth);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedBody);
    });

    test("It should return 3 restaurants if we dont pass an id", async () => {
      const response = await request(app)
        .get("/restaurants")
        .set("Authorization", alternateAuth);

      expect(response.statusCode).toEqual(200);
      expect(response.body.length).toEqual(3);
    });

    test("It should respond with error if there is no id for that restaurant", async () => {
      const expectedBody = "";

      const response = await request(app)
        .get("/restaurants?id=20")
        .set("Authorization", defaultAuth);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedBody);
    });
  });
});
