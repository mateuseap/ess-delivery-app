const { resetTestDb } = require("../utils");
const { ManipulateDatabase } = require("../../utils/db");
const fs = require("fs");

function arrayIncludes(arr, data) {
  return (
    arr.filter((item) => JSON.stringify(item) == JSON.stringify(data)).length >
    0
  );
}

describe("Test the cart path", () => {
  beforeEach(() => {
    resetTestDb();
  });

  afterAll(() => {
    resetTestDb();
  });

  test("Test constructor", () => {
    const table = new ManipulateDatabase("carts");
    expect(table.tableName).toEqual("carts");
    expect(table.filePath).toEqual("./test_data/carts.json");
  });

  test("Test read method", () => {
    const table = new ManipulateDatabase("carts");
    table.read();
    expect(table.document).toEqual(
      JSON.parse(fs.readFileSync("test_data/carts.json", "utf8"))
    );
  });

  test("Test write method", () => {
    const mockData = { data: "data" };
    const table = new ManipulateDatabase("carts");
    table.write(mockData);
    expect(mockData).toEqual(
      JSON.parse(fs.readFileSync("test_data/carts.json", "utf8"))
    );

    expect(table.document).toEqual(mockData);
  });

  test("Test append method", () => {
    const mockData = { data: "data" };

    const expectedData = JSON.parse(
      fs.readFileSync("test_data/default/carts.json", "utf8")
    ).carts;
    expectedData.push(mockData);
    const table = new ManipulateDatabase("carts");
    table.append(mockData);
    expect(table.document.carts).toEqual(expectedData);
  });

  test("Test findAndReplace method with replace", () => {
    const mockData = { data: "data" };
    const table = new ManipulateDatabase("carts");

    const compareFunction = (item) => item.user_id == "1";

    const replacedData = table.document.carts.find(compareFunction);
    table.findAndReplace(compareFunction, mockData);
    console.log(table.document.carts.includes(0));

    expect(arrayIncludes(table.document.carts, mockData)).toBeTruthy();
    expect(!arrayIncludes(table.document.carts, replacedData)).toBeTruthy();
  });

  test("Test findAndReplace method with append", () => {
    const mockData = { data: "data" };
    const table = new ManipulateDatabase("carts");

    const compareFunction = (item) => item.user_id == "5";

    const expectedData = table.document.carts;
    expectedData.push(mockData);
    table.findAndReplace(compareFunction, mockData);

    expect(table.document.carts).toEqual(expectedData);
  });

  test("Test getArray method", () => {
    const table = new ManipulateDatabase("carts");
    const responseArray = table.getArray();
    expect(table.document.carts).toEqual(responseArray);
  });

  test("Test query method", () => {
    const table = new ManipulateDatabase("carts");
    const response = table.query({
      inner: {
        nameObjToQuery: "carts",
        matchId: `user_id=${1}`,
      },
    });

    expect(response).toEqual(
      table.document.carts.find((item) => item.user_id === "1")
    );
  });

  test("Test saveChanges method", () => {
    const table = new ManipulateDatabase("carts");
    fs.writeFileSync("test_data/carts.json", JSON.stringify({}), (err) => {
      if (err) throw err;
    });

    table.saveChanges();

    expect(table.document).toEqual(
      JSON.parse(fs.readFileSync("test_data/carts.json", "utf8"))
    );
  });
});
