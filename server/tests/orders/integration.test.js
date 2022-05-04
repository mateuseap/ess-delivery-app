const request = require("supertest");
const app = require("../../app");
const {
  getOrderDefaultResponse,
  postOrderDefaultResponse,
  postOrdersDefaultRequest,
  getOrderByIdDefaultResponse,
} = require("./dataUtils");

const uuid = require("uuid");

const { resetTestDb, defaultAuth, alternateAuth } = require("../utils");

describe("Test the order path", () => {
  beforeEach(() => {
    resetTestDb();
  });

  afterAll(() => {
    resetTestDb();
  });

  describe("GET method", () => {
    test("It should respond with the user's orders", async () => {
      const expectedBody = getOrderDefaultResponse;

      const response = await request(app)
        .get("/orders?dateFilter=300")
        .set("Authorization", defaultAuth);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.not.arrayContaining([
          expect.not.objectContaining({ user_id: "1" }),
        ])
      );
    });

    test("It should respond null if the user has no orders", async () => {
      const expectedBody = [];

      const response = await request(app)
        .get("/orders?dateFilter=30")
        .set("Authorization", alternateAuth);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedBody);
    });

    test("It should respond with error if there is no auth", async () => {
      const expectedBody = { message: "Invalid token specified" };

      const response = await request(app).get("/orders?dateFilter=30");

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(expectedBody);
    });
  });

  describe("POST method", () => {
    test("It should respond with the user's updated orders", async () => {
      const expectedBody = postOrderDefaultResponse;

      const response = await request(app)
        .post("/orders")
        .set("Authorization", defaultAuth)
        .send(postOrdersDefaultRequest);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(
        expect.not.arrayContaining([
          expect.not.objectContaining({ user_id: "1" }),
        ])
      );
    });

    test("It should respond with error if there is no auth", async () => {
      const expectedBody = { message: "Invalid token specified" };

      const response = await request(app)
        .post("/orders")
        .send(postOrdersDefaultRequest);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(expectedBody);
    });
  });

  describe("makeOrder method", () => {
    test("It should respond with new order id", async () => {
      const expectedBody = postOrderDefaultResponse;

      const response = await request(app)
        .post("/make-order")
        .set("Authorization", defaultAuth)
        .send({});

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty("id");
      expect(uuid.validate(response.body.id)).toBeTruthy();
    });

    test("It should respond with error if there is no auth", async () => {
      const expectedBody = { message: "Invalid token specified" };

      const response = await request(app)
        .post("/make-order")
        .send(postOrdersDefaultRequest);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(expectedBody);
    });
  });

  describe("getOrderById method", () => {
    test("It should respond with new order id", async () => {
      const expectedBody = getOrderByIdDefaultResponse;

      const response = await request(app)
        .get("/order-details?id=749c347c-4038-418d-b4a9-9e6d22329d19")
        .set("Authorization", defaultAuth);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty("id");
      expect(uuid.validate(response.body.id)).toBeTruthy();
    });

    test("It should respond with error if there is no auth", async () => {
      const expectedBody = { message: "Invalid token specified" };

      const response = await request(app)
        .get("/order-details")
        .send(postOrdersDefaultRequest);

      expect(response.statusCode).toEqual(500);
      expect(response.body).toEqual(expectedBody);
    });
  });
});
