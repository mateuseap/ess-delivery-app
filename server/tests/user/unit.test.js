const request = require("supertest");
const { getUser } = require("../../resources/user");
const { ManipulateDatabase } = require("../../utils/db");
const { getUserDefaultResponse } = require("./dataUtils");

const { defaultAuth } = require("../utils");

jest.mock("../../utils/db");

describe("Test the cart resource", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("It should test the GET method", () => {
    test("It should return the user's info", async () => {
      const mockData = getUserDefaultResponse;

      ManipulateDatabase.prototype.query.mockReturnValueOnce(mockData);

      const req = { headers: { authorization: defaultAuth } };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
      await getUser(req, res);

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
      await getUser(req, res);

      expect(ManipulateDatabase).toHaveBeenCalledTimes(0);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).lastCalledWith(500);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).lastCalledWith(expectedBody);
    });
  });
});
