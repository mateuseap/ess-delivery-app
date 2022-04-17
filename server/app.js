const express = require("express");
<<<<<<< HEAD
const cors = require("cors");
const bodyParser = require("body-parser");
=======
const bodyParser = require("body-parser");
const { getCart, postCart } = require("./resources/cart");
const { getUser } = require("./resources/user");
const { getRestaurants } = require("./resources/restaurant");
const { getOrders, postOrders } = require("./resources/order");

const cors = require("cors");

>>>>>>> fixDesenvolvimento
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    res.redirect("/api");
  } catch (err) {
    console.error(err);
    res.status(400).send({});
  }
});

app
  .route("/api")
  .get(async (req, res) => {
    try {
      res.status(200).send("heyyy");
    } catch (err) {
      console.error(err);
      res.status(400).send({});
    }
  })
  .post(async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      res.status(200).send(JSON.stringify({ res: "Got it" }));
    } catch (err) {
      console.error(err);
      res.status(400).send({});
    }
  });
=======
app.use(cors());

app.get("/cart", getCart);
app.post("/cart", postCart);

app.get("/user", getUser);

app.get("/restaurants", getRestaurants);

app.get("/orders", getOrders);
app.post("/orders", postOrders);
>>>>>>> fixDesenvolvimento

app.listen(1337, (_) => {
  console.log("Server running on port 1337");
});
