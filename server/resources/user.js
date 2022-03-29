const { ManipulateDatabase } = require("../utils/db");

exports.getUser = async (req, res) => {
  try {
    const table = new ManipulateDatabase("users");
    res.status(200).send(JSON.stringify(table.getArray()));
  } catch (err) {
    res.status(400).send(err);
  }
};
