const request = require("supertest");
const { getCart, postCart } = require("../../resources/cart");
const { ManipulateDatabase } = require("../../utils/db");
const {
  getCartDefaultResponse,
  postCartDefaultReq,
  postCartDefaultResponse,
  postCartNewCartResponse,
} = require("./dataUtils");

const { defaultAuth } = require("../utils");

jest.mock("../../utils/db");

describe("Test the cart resource", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("It should test the GET method", () => {
    test("It should return the user's cart", async () => {
      const mockData = getCartDefaultResponse;

      ManipulateDatabase.prototype.query.mockReturnValueOnce(mockData);

      const req = { headers: { authorization: defaultAuth } };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
      await getCart(req, res);

      expect(ManipulateDatabase).toHaveBeenCalledTimes(1);
      const dbInstance = ManipulateDatabase.mock.instances[0];
      expect(dbInstance.query).toHaveBeenCalledTimes(1);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).lastCalledWith(200);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).lastCalledWith(mockData);
    });

    test("It should return error when auth is not present", async () => {
      const expectedBody = { message: "Invalid token specified" };
      const req = { headers: {} };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
      await getCart(req, res);

      expect(ManipulateDatabase).toHaveBeenCalledTimes(0);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).lastCalledWith(500);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).lastCalledWith(expectedBody);
    });
  });

  describe("It should test the POST method", () => {
    test("It should return the user's updated cart", async () => {
      const expectedData = postCartDefaultResponse;
      const tableQueryMockData = {
        user_id: "1",
        rest_id: 0,
        rest_name: "Almir quentinhas",
        total: 29,
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
          {
            name: "Cubos de carne ao molho madeira",
            quantity: 1,
            price: 13,
            item_id: 3,
            photo:
              "https://www.divenetoalimentos.com.br/images/produtos/picadinho-de-cubos-de-carne-com-molho-congelado.png",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum velit mi, elementum non interdum ut, mattis si",
          },
        ],
      };

      ManipulateDatabase.prototype.query.mockReturnValueOnce(
        tableQueryMockData
      );
      ManipulateDatabase.prototype.findAndReplace.mockImplementation(() => {});

      const req = {
        headers: { authorization: defaultAuth },
        body: postCartDefaultReq,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
      await postCart(req, res);

      expect(ManipulateDatabase).toHaveBeenCalledTimes(1);
      const dbInstance = ManipulateDatabase.mock.instances[0];
      expect(dbInstance.query).toHaveBeenCalledTimes(1);
      expect(dbInstance.findAndReplace).toHaveBeenCalledTimes(1);
      expect(dbInstance.findAndReplace).lastCalledWith(
        expect.anything(),
        expectedData
      );

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).lastCalledWith(200);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).lastCalledWith(expectedData);
    });

    test("It should return updated cart if user has no cart", async () => {
      const expectedData = postCartNewCartResponse;

      ManipulateDatabase.prototype.query.mockReturnValueOnce(null);
      ManipulateDatabase.prototype.findAndReplace.mockImplementation(() => {});

      const req = {
        headers: { authorization: defaultAuth },
        body: postCartDefaultReq,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
      await postCart(req, res);

      expect(ManipulateDatabase).toHaveBeenCalledTimes(1);
      const dbInstance = ManipulateDatabase.mock.instances[0];
      expect(dbInstance.query).toHaveBeenCalledTimes(1);
      expect(dbInstance.findAndReplace).toHaveBeenCalledTimes(1);
      expect(dbInstance.findAndReplace).lastCalledWith(
        expect.anything(),
        expectedData
      );

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).lastCalledWith(200);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).lastCalledWith(expectedData);
    });

    test("It should return error when auth is not present", async () => {
      const expectedBody = { message: "Invalid token specified" };
      const req = { headers: {} };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
      await postCart(req, res);

      expect(ManipulateDatabase).toHaveBeenCalledTimes(0);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).lastCalledWith(500);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).lastCalledWith(expectedBody);
    });
  });
});
