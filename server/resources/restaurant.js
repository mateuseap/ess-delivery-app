const { ManipulateDatabase } = require("../utils/db");

const restaurants = new ManipulateDatabase("restaurants");

exports.getRestaurants = async (req, res) => {
  try {
    const arr = restaurants.getArray();
    res.status(200).send(JSON.stringify(arr));
  } catch (err) {
    res.status(500).send(err);
  }
};
