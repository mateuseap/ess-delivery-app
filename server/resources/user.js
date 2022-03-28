const { ManipulateDatabase } = require("../utils/db");

exports.getUser = async (req, res) => {
  try {
    const table = new ManipulateDatabase("users", "read");
    const users = table.getFileContent().users;
    res.status(200).send(
      JSON.stringify(users)
    );
  } catch (err) {
    res.status(400).send(err);
  }
};
