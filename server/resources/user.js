const { ManipulateDatabase } = require("../utils/db");
const jwt_decode = require("jwt-decode");

exports.getUser = async (req, res) => {
  try {
    decoded_auth = jwt_decode(req.headers.authorization);

    const table = new ManipulateDatabase("users");

    user_data = table.query({
      inner: {
        nameObjToQuery: "users",
        matchId: `id=${decoded_auth.userId}`,
      },
    });

    res.status(200).send(user_data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
