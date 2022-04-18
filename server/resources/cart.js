const { ManipulateDatabase } = require("../utils/db");

exports.getCart = async (req, res) => {
  try {
    decoded_auth = jwt_decode(req.headers.authorization);

    const table = new ManipulateDatabase("carts");

    cart_data = table.query({
      inner: {
        nameObjToQuery: "carts",
        matchId: `user_id=${decoded_auth.userId}`,
      },
    });

    res.status(200).send(JSON.stringify(cart_data));
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.postCart = async (req, res) => {
  try {
    table.write({ orders: req.body.data });
    res.status(200).send(JSON.stringify(table.getArray()));
  } catch (err) {
    res.status(500).send(err);
  }
};
