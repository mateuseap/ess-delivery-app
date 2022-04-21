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
    const table = new ManipulateDatabase("carts");
    table_data = update_database(req.body, table.getArray());

    table.write({ carts: table_data });
    res.status(200).send(JSON.stringify(table.getArray()));
  } catch (err) {
    res.status(500).send(err);
  }
};
