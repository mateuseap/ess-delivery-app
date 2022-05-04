const request = require("supertest");
const { getRestaurants } = require("../../resources/restaurant");
const { ManipulateDatabase } = require("../../utils/db");
const { getRestaurantDefaultResponse } = require("./dataUtils");

jest.mock("../../utils/db");

describe("Test the cart resource", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("It should test the GET method", () => {
    test("It should return the restaurant if passed an id", async () => {
      const mockData = getRestaurantDefaultResponse;

      ManipulateDatabase.prototype.query.mockReturnValueOnce(mockData);

      const req = { query: { id: 0 } };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
      await getRestaurants(req, res);

      expect(ManipulateDatabase).toHaveBeenCalledTimes(1);
      const dbInstance = ManipulateDatabase.mock.instances[0];
      expect(dbInstance.query).toHaveBeenCalledTimes(1);
      expect(dbInstance.getArray).toHaveBeenCalledTimes(0);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).lastCalledWith(200);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).lastCalledWith(mockData);
    });

    test("It should return 3 restaurants if not passed an id", async () => {
      const mockData = ["a", "b", "c", "d", "e"];

      ManipulateDatabase.prototype.getArray.mockReturnValueOnce(mockData);

      const req = { query: {} };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      await getRestaurants(req, res);

      expect(ManipulateDatabase).toHaveBeenCalledTimes(1);
      const dbInstance = ManipulateDatabase.mock.instances[0];
      expect(dbInstance.query).toHaveBeenCalledTimes(0);
      expect(dbInstance.getArray).toHaveBeenCalledTimes(1);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).lastCalledWith(200);

      expect(res.send).toHaveBeenCalledTimes(1);
      const responseArray = res.send.mock.calls[0][0];
      expect(responseArray.length).toEqual(3);

      for (restaurant of responseArray) {
        expect(mockData.includes(restaurant)).toBeTruthy();
      }
    });
  });
});
