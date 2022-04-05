const { ManipulateDatabase } = require("../utils/db");

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = new ManipulateDatabase("restaurants");
    const arr = restaurants.getArray();
    const rand = Math.floor(Math.random() * arr.length);
    res.status(200).send(JSON.stringify(arr.slice(rand, (rand + 3) % arr.length)));
  } catch (err) {
    res.status(400).send(err);
  }
};
