const request = require("supertest");
const app = require("../../app");
const {
  getCartDefaultResponse,
  postCartDefaultReq,
  postCartDefaultResponse,
} = require("./dataUtils");

const { resetTestDb, defaultAuth, alternateAuth } = require("../utils");

describe("Test the cart path", () => {
  beforeEach(() => {
    resetTestDb();
  });

  afterAll(() => {
    resetTestDb();
  });

  describe("GET method", () => {
    test("It should respond with the user's cart if he has one", async () => {
      const expectedBody = getCartDefaultResponse;

      const response = await request(app)
        .get("/cart")
        .set("Authorization", defaultAuth);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedBody);
    });

    test("It should respond null if the userhas no cart", async () => {
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

  describe("POST method", () => {
    test("It should update the cart if the user has one", async () => {
      const expectedBody = postCartDefaultResponse;

      const response = await request(app)
        .post("/cart")
        .set("Authorization", defaultAuth)
        .send(postCartDefaultReq);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual(expectedBody);
    });
  });

  test("It should create new cart if the user has none", async () => {
    const expectedBody = {
      user_id: "2",
      rest_id: 0,
      rest_name: "Almir quentinhas",
      total: 11,
      items: [
        {
          name: "Frango a milanesa",
          quantity: 1,
          price: 11,
          item_id: 2,
          photo:
            "https://img.itdg.com.br/tdg/images/recipes/000/021/372/357312/357312_original.jpg?mode=crop&width=710&height=400",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum velit mi, elementum non interdum ut, mattis si",
        },
      ],
    };

    const response = await request(app)
      .post("/cart")
      .set("Authorization", alternateAuth)
      .send(postCartDefaultReq);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expectedBody);
  });
});
