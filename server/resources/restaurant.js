const { ManipulateDatabase } = require("../utils/db");
const { getRandomSlice } = require("../utils/misc");

const restaurants = new ManipulateDatabase("restaurants");

exports.getRestaurants = async (req, res) => {
  try {
    const arr = restaurants.getArray();
    if (req.body.displayAll) res.status(200).send(JSON.stringify(arr));
    else res.status(200).send(JSON.stringify(getRandomSlice(arr, 3)));
  } catch (err) {
    res.status(500).send(err);
  }
};
