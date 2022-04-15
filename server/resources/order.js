const { ManipulateDatabase } = require("../utils/db");
const { getRandomSlice } = require("../utils/misc");

const table = new ManipulateDatabase("orders");

exports.getOrders = async (req, res) => {
  try {
    res.status(200).send(JSON.stringify(table.getArray()));
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.postOrders = async (req, res) => {
  try {
    table.write({ orders: req.body.data });
    res.status(200).send(JSON.stringify(table.getArray()));
  } catch (err) {
    res.status(500).send(err);
  }
};
