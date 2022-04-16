const { ManipulateDatabase } = require("../utils/db");

const table = new ManipulateDatabase("orders");

exports.getOrders = async (req, res) => {
  try {
    res.status(200).send(JSON.stringify(table.getArray()));
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.postOrders = async (req, res) => {
  try {
    console.log(req.body);
    // Restaurants update
    const restaurants = new ManipulateDatabase("restaurants");
    const changes = req.body.data.changes;
    const arr = restaurants.getArray();
    arr[changes.index].rates.push({
      user_id: 1,
      stars: changes.rate.stars,
      feedback_text: changes.rate.feedback_text,
    });

    restaurants.write({ restaurants: arr });

    // Orders update
    table.write({ orders: req.body.data.data });
    res.status(200).send(JSON.stringify(table.getArray()));
  } catch (err) {
    res.status(500).send(err);
  }
};
