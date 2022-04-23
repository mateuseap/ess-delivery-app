const express = require("express");
const bodyParser = require("body-parser");
const { getCart, postCart } = require("./resources/cart");
const { getUser } = require("./resources/user");
const { getRestaurants } = require("./resources/restaurant");
const {
  getOrders,
  postOrders,
  getOrderById,
  makeOrder,
} = require("./resources/order");

const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/cart", getCart);
app.post("/cart", postCart);

app.get("/user", getUser);

app.get("/restaurants", getRestaurants);

app.get("/orders", getOrders);
app.post("/orders", postOrders);

app.get("/order-details", getOrderById);

app.post("/make-order", makeOrder);

app.listen(1337, (_) => {
  console.log("Server running on port 1337");
});
