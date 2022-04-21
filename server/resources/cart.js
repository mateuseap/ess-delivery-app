const { ManipulateDatabase } = require("../utils/db");
const jwt_decode = require("jwt-decode");

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
    const decoded_auth = jwt_decode(req.headers.authorization);
    const table = new ManipulateDatabase("carts");
    const compareFunction = (item, index) =>
      item.user_id == decoded_auth.userId;
    table.replaceOrAppend(compareFunction, req.body.cart);

    res.status(200).send(req.body.cart);
  } catch (err) {
    res.status(500).send(err);
  }
};
