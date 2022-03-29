const { ManipulateDatabase } = require("../utils/db");

exports.getRestaurant = async (req, res) => {
  try {
    const aux = new ManipulateDatabase("restaurants");
    res.status(200).send(
      JSON.stringify(
        aux.read({
          booleans: [
            {
              findOne: false,
              expr: "name=Almir quentinhas",
            },
          ],
        })
      )
    );
  } catch (err) {
    res.status(400).send(err);
  }
};
