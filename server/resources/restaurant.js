const { ManipulateDatabase } = require("../utils/db");
const { getRandomSlice } = require("../utils/misc");

const restaurants = new ManipulateDatabase("restaurants");

exports.getRestaurants = async (req, res) => {
  try {
    const arr = restaurants.getArray();
    if (req.body.displayAll) {
      // histórico de pedidos
      res.status(200).send(JSON.stringify(arr));
    } else {
      res.status(200).send(JSON.stringify(getRandomSlice(arr, 3)));
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.putRestaurants = async (req, res) => {
  try {
    const changes = req.body.changes;
    let arr = restaurants.getArray();
    arr[changes.index].rates.push({
      user_id: 0,
      stars: changes.rate.stars,
      feedback_text: changes.rate.feedback_text,
    });

    restaurants.write({ restaurants: arr });
    arr = restaurants.getArray();
    res.status(200).send(JSON.stringify(arr));
  } catch (err) {
    res.status(500).send(err);
  }
};
