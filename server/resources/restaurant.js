const { ManipulateDatabase } = require("../utils/db");
const { getRandomSlice } = require("../utils/misc");

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = new ManipulateDatabase("restaurants");
    if (req.query.id !== undefined) {
      const restId = JSON.parse(req.query.id);

      rest_data = restaurants.query({
        inner: {
          nameObjToQuery: "restaurants",
          matchId: `id=${restId}`,
        },
      });
      res.status(200).send(rest_data);
    } else {
      const arr = getRandomSlice(restaurants.getArray(), 3);
      res.status(200).send(arr);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
