const fs = require("fs");

exports.defaultAuth =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIn0";

exports.alternateAuth =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIn0";

exports.resetTestDb = () => {
  const CartsData = JSON.parse(
    fs.readFileSync("test_data/default/carts.json", "utf8")
  );

  fs.writeFileSync("test_data/carts.json", JSON.stringify(CartsData));

  const UsersData = JSON.parse(
    fs.readFileSync("test_data/default/users.json", "utf8")
  );

  fs.writeFileSync("test_data/users.json", JSON.stringify(UsersData));

  const RestaurantsData = JSON.parse(
    fs.readFileSync("test_data/default/restaurants.json", "utf8")
  );

  fs.writeFileSync(
    "test_data/restaurants.json",
    JSON.stringify(RestaurantsData)
  );

  const OrdersData = JSON.parse(
    fs.readFileSync("test_data/default/orders.json", "utf8")
  );

  fs.writeFileSync("test_data/orders.json", JSON.stringify(OrdersData));
};
