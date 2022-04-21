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

function update_database(item, table) {
  let flag1 = 0;
  table.map((element) => {
    if (element.rest_id == item.rest_id) {
      flag1 = 1;
      element.total += item.item.price;
      let flag = 0;
      element.items.map((x) => {
        if (x.name == item.item.name) {
          flag = 1;
          x.quantity += 1;
        }
        return x;
      });
      if (!flag) {
        element.items.push(item.item);
      }
    }
    return element;
  });
  if (!flag1) {
    table.push({
      user_id: 1,
      rest_id: item.rest_id,
      rest_name: item.rest_name,
      total: item.item.price,
      items: [
        {
          name: item.item.name,
          quantity: 1,
          price: item.item.price,
          photo: item.item.photo,
          description: item.item.description,
        },
      ],
    });
  }
  return table;
}

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
