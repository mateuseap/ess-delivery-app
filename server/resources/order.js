const { ManipulateDatabase } = require("../utils/db");

const table = new ManipulateDatabase("orders");

function dateToString(date) {
  const data = date,
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  return anoF + "-" + mesF + "-" + diaF;
}

function dateStrToInt(dateStr) {
  return new Date(dateStr).getTime();
}

exports.getOrders = async (req, res) => {
  try {
    const days = JSON.parse(req.query.query).query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const resp = table.read({
      deep: {
        deepSearch: true,
        booleans: [
          {
            findOne: false,
            expr: `date>=${dateToString(startDate)}`,
          },
        ],
      },
    });
    resp.sort((a, b) => dateStrToInt(b.date) - dateStrToInt(a.date));
    res.status(200).send(JSON.stringify(resp));
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.postOrders = async (req, res) => {
  try {
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
    table.deleteOrReplace(
      changes.index,
      1,
      req.body.data.data[changes.modifiedIndex]
    );
    res.status(200).send(JSON.stringify({ post: true, err: false }));
  } catch (err) {
    res.status(500).send(err);
  }
};
