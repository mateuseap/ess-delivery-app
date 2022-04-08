const { ManipulateDatabase } = require("../utils/db");

const restaurants = new ManipulateDatabase("restaurants");
const arr = restaurants.getArray();
const rand = Math.floor(Math.random() * arr.length);

exports.getRestaurants = async (req, res) => {
  try {
    res
      .status(200)
      .send(JSON.stringify(arr.slice(rand, (rand + 3) % arr.length)));
  } catch (err) {
    res.status(500).send(err);
  }
};
