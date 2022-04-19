const { ManipulateDatabase } = require("../utils/db");
const { getRandomSlice } = require("../utils/misc");

const restaurants = new ManipulateDatabase("restaurants");

exports.getRestaurants = async (req, res) => {
  try {
    const requisition = JSON.parse(req.query.query);
    const arr = restaurants.getArray();
    if (requisition.query === "displayAll") res.status(200).send(JSON.stringify(arr));
    else if (requisition.query >= 0) {
      const resp = restaurants.read({
        deep: {
          deepSearch: true,
          booleans: [
            {
              findOne: true,
              expr: `id=${requisition.query}`,
            },
          ],
        },
      });
      res.status(200).send(resp);
    } else res.status(200).send(JSON.stringify(getRandomSlice(arr, 3)));
  } catch (err) {
    res.status(500).send(err);
  }
};
