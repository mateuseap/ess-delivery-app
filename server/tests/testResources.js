const { resetTestDb } = require("./utils");
const { ManipulateDatabase } = require("../utils/db");

exports.resetTest = async (req, res) => {
  resetTestDb();
  res.status(200).send("success");
};

exports.configTest = async (req, res) => {
  const acceptedKeys = ["carts", "orders", "restaurants", "users"];

  table = new ManipulateDatabase("carts");
  table.write(req.body.carts);

  for (key of Object.keys(req.body)) {
    if (acceptedKeys.includes(key)) {
      table = new ManipulateDatabase(key);
      const obj = {};
      obj[key] = req.body[key];
      table.write(obj);
      res.status(200).send("success");
    }
  }
};
