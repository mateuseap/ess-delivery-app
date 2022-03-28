const ManipulateDatabase = require("../utils/db");

exports.getUser = async (req, res) => {
  try {
    const db = new ManipulateDatabase("users", "read");
    const users = db.getFileContent().users;
    res.status(200).send(
      JSON.stringify({
        name: "Felipe Gonçalves",
        id: 5,
      })
    );
  } catch (err) {
    res.status(400).send(err);
  }
};
