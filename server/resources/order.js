const { ManipulateDatabase } = require("../utils/db");
const {
  dateToString,
  dateStrToInt,
  createOrder,
  dispatchOrderStatusWorker,
} = require("../utils/misc");
const jwt_decode = require("jwt-decode");

function queryByDate(days) {
  const startDate = new Date();
  const table = new ManipulateDatabase("orders");

  startDate.setDate(startDate.getDate() - days);
  const resp = table.read({
    deep: {
      deepSearch: true,
      booleans: [
        {
          findOne: false,
          expr: `date>=${dateToString(startDate)}`,
        },
      ],
    },
  });

  resp.sort((a, b) => dateStrToInt(b.date) - dateStrToInt(a.date));
  return resp;
}

exports.getOrders = async (req, res) => {
  try {
    const days = JSON.parse(req.query.query).query;
    res.status(200).send(JSON.stringify(queryByDate(days)));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.postOrders = async (req, res) => {
  try {
    decoded_auth = jwt_decode(req.headers.authorization);
    // Restaurants update
    const restaurants = new ManipulateDatabase("restaurants");
    const changes = req.body.data.changes;
    const arr = restaurants.getArray();
    arr[changes.index].rates.push({
      user_id: decoded_auth.userId,
      stars: changes.rate.stars,
      feedback_text: changes.rate.feedback_text,
    });

    restaurants.write({ restaurants: arr });

    // Orders update
    const daysFilter = req.body.data.daysFilter;
    table.deleteOrReplace(changes.index, 1, req.body.data.data);

    res.status(200).send(JSON.stringify(queryByDate(daysFilter)));
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.query;

    const table = new ManipulateDatabase("orders");
    const data = table.query({
      inner: {
        nameObjToQuery: "orders",
        matchId: `id=${id}`,
      },
    });
    if (!data) throw new Error("Pedido não existe!");

    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.makeOrder = async (req, res) => {
  try {
    decoded_auth = jwt_decode(req.headers.authorization);

    const ordersTable = new ManipulateDatabase("orders");
    const cartTable = new ManipulateDatabase("carts");
    const restaurantsTable = new ManipulateDatabase("restaurants");
    const userTable = new ManipulateDatabase("users");

    let cart_data = cartTable.query({
      inner: {
        nameObjToQuery: "carts",
        matchId: `user_id=${decoded_auth.userId}`,
      },
    });
    if (!cart_data) throw new Error("User has no Cart");

    const user_data = userTable.query({
      inner: {
        nameObjToQuery: "users",
        matchId: `id=${decoded_auth.userId}`,
      },
    });

    const rest_data = restaurantsTable.query({
      inner: {
        nameObjToQuery: "restaurants",
        matchId: `id=${cart_data.rest_id}`,
      },
    });

    let order = createOrder(
      cart_data,
      rest_data.addresses,
      user_data.addresses
    );

    ordersTable.append(order);
    const cartCompareFunction = (item) => item.user_id == decoded_auth.userId;
    //cartTable.findAndReplace(cartCompareFunction, null);

    const orderId = order.id;

    dispatchOrderStatusWorker(orderId);

    res.status(200).send(JSON.stringify({ id: orderId }));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
