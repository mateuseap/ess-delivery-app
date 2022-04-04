const { ManipulateDatabase } = require("../utils/db");

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = new ManipulateDatabase("restaurants");
    res.status(200).send(JSON.stringify(restaurants.getArray()));
  } catch (err) {
    res.status(400).send(err);
  }
};
