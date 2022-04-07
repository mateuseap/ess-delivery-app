const { ManipulateDatabase } = require("../utils/db");
const table = new ManipulateDatabase("orders");

exports.getMapRoute = async (req, res) => {
  try {
    const urlParam = JSON.parse(req.query.param);
    const orderId = urlParam.orderId;
    const ans = table.read({
      deep: {
        deepSearch: false,
        booleans: [
          {
            findOne: true,
            expr: `id=${orderId}`,
          },
        ],
      },
    });

    res.status(200).send(
      JSON.stringify({
        from: ans.from,
        to: ans.to,
        mapsKey: process.env.GOOGLE_API_KEY,
      })
    );
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getOrders = async (req, res) => {
  try {
    res.status(200).send(JSON.stringify(table.getArray()));
  } catch (err) {
    res.status(500).send(err);
  }
};
