const { ManipulateDatabase } = require("../utils/db");
const { getRandomSlice } = require("../utils/misc");

const restaurants = new ManipulateDatabase("restaurants");

exports.getRestaurants = async (req, res) => {
  try {
    const arr = restaurants.getArray();
    let requisition = null;
    if (req.query.query !== undefined)
      requisition = JSON.parse(req.query.query);

    if (req.query.id !== undefined) {
      const restId = JSON.parse(req.query.id);
      const resp = restaurants.read({
        deep: {
          deepSearch: true,
          booleans: [
            {
              findOne: true,
              expr: `id=${restId}`,
            },
          ],
        },
      });
      res.status(200).send(resp);
    } else if (requisition.query && requisition.query === "displayAll")
      res.status(200).send(JSON.stringify(arr));
    else res.status(200).send(JSON.stringify(getRandomSlice(arr, 3)));
  } catch (err) {
    res.status(500).send(err);
  }
};
