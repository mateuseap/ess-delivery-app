const { ManipulateDatabase } = require("../utils/db");
const {
  dateToString,
  dateStrToInt,
  createOrder,
  dispatchOrderStatusWorker,
} = require("../utils/misc");
const jwt_decode = require("jwt-decode");

function queryOrdersByDate(days, user_id) {
  const startDate = new Date();
  const table = new ManipulateDatabase("orders");

  startDate.setDate(startDate.getDate() - days);
  const resp = table.query({
    deep: {
      deepSearch: true,
      booleans: [
        {
          findOne: false,
          expr: `date>=${dateToString(startDate)}`,
        },
        {
          findOne: false,
          expr: `user_id>=${user_id}`,
        },
      ],
    },
  });
  resp.sort((a, b) => dateStrToInt(b.date) - dateStrToInt(a.date));
  return resp;
}

exports.getOrders = async (req, res) => {
  try {
    decoded_auth = jwt_decode(req.headers.authorization);
    const days = req.query.dateFilter;
    const data = queryOrdersByDate(days, decoded_auth.userId);
    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.postOrders = async (req, res) => {
  try {
    decoded_auth = jwt_decode(req.headers.authorization);

    // Restaurants update
    const restaurantsTable = new ManipulateDatabase("restaurants");

    const restaurantData = restaurantsTable.query({
      inner: {
        nameObjToQuery: "restaurants",
        matchId: `id=${req.body.restaurantId}`,
      },
    });

    const newRate = {
      user_id: decoded_auth.userId,
      stars: req.body.rate.stars,
      feedback_text: req.body.rate.feedback_text,
    };

    restaurantData.rates.push(newRate);

    const restaurantCompareFunction = (item) =>
      item.id == req.body.restaurantId;
    restaurantsTable.findAndReplace(restaurantCompareFunction, restaurantData);

    // Orders update
    const ordersTable = new ManipulateDatabase("orders");

    const orderData = ordersTable.query({
      inner: {
        nameObjToQuery: "orders",
        matchId: `id=${req.body.orderId}`,
      },
    });

    orderData.rate = {
      did: true,
      stars: req.body.rate.stars,
      feedback_text: req.body.rate.feedback_text,
    };

    const orderCompareFunction = (item) => item.id == req.body.orderId;
    ordersTable.findAndReplace(orderCompareFunction, orderData);

    const daysFilter = req.body.daysFilter;
    const resData = queryOrdersByDate(daysFilter, decoded_auth.userId);
    res.status(200).send(JSON.stringify(resData));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const decoded_auth = jwt_decode(req.headers.authorization);

    const ordersTable = new ManipulateDatabase("orders");
    const item = ordersTable.query({
      inner: {
        nameObjToQuery: "orders",
        matchId: `id=${req.body.id}`,
      },
    });

    if (item.user_id != decoded_auth.userId) throw new Error("Sem autorização");

    const DELIVERING_TIME = 90 * 60 * 1000;
    if (item.status.preparing && item.timestamp + DELIVERING_TIME > new Date()) {
      //preparing and not delayed
      throw new Error(
        "O pedido só pode ser cancelado se seu preparo não tiver sido iniciado ou se houver um atraso de 30 minutos ou mais"
      );
    }

    const orderCompareFunction = (item) => item.id == req.body.id;
    ordersTable.findAndReplace(orderCompareFunction, null, false);

    res.status(200).send(JSON.stringify({ msg: "Success" }));
  } catch (err) {
    console.error(err);
    res.status(500).send(JSON.stringify({ msg: err.message }));
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
    console.error(err);
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
    cartTable.findAndReplace(cartCompareFunction, null);

    const orderId = order.id;

    dispatchOrderStatusWorker(orderId);

    res.status(200).send(JSON.stringify({ id: orderId }));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
