const uuid = require("uuid");
const { ManipulateDatabase } = require("./db");

exports.getRandomSlice = (arr, size) => {
  const rand = Math.floor(Math.random() * (arr.length - size)) % arr.length;
  return arr.slice(rand, (rand + size) % arr.length);
};

exports.dateToString = (date) => {
  const data = date,
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  return anoF + "-" + mesF + "-" + diaF;
};

exports.dateStrToInt = (dateStr) => new Date(dateStr).getTime();

exports.createOrder = (cart_data, rest_addresses, user_addresses) => {
  const today = new Date().toISOString().slice(0, 10);
  const timestamp = Date.now();

  return {
    id: uuid.v4(),
    restaurant_id: cart_data.rest_id,
    restaurant_name: cart_data.rest_name,
    user_id: cart_data.user_id,
    orderImage: cart_data.items[0].photo,
    total_price: cart_data.total,
    date: today,
    timestamp: timestamp,
    description: cart_data.items,
    from: rest_addresses[0],
    to: user_addresses[0],
    payment: {},
    status: {
      confirmed: true,
      preparing: false,
      delivering: false,
      finished: false,
    },
    rate: {
      did: false,
      stars: 0,
      feedback_text: "",
    },
  };
};

function orderStatusWorker(field, orderId) {
  const orderCompareFunction = (item) => item.id == orderId;

  const ordersTable = new ManipulateDatabase("orders");

  const order_data = ordersTable.query({
    inner: {
      nameObjToQuery: "orders",
      matchId: `id=${orderId}`,
    },
  });

  order_data.status[field] = true;
  ordersTable.findAndReplace(orderCompareFunction, order_data, false);
  console.log(
    ordersTable.query({
      inner: {
        nameObjToQuery: "orders",
        matchId: `id=${orderId}`,
      },
    }).status
  );
}

//simula atualização de status do pedido pelo restaurante
exports.dispatchOrderStatusWorker = (orderId) => {
  setTimeout(() => {
    console.log("dale");
    orderStatusWorker("preparing", orderId);
  }, 10000);
  setTimeout(() => {
    console.log("dale");
    orderStatusWorker("delivering", orderId);
  }, 20000);
  setTimeout(() => {
    console.log("dale");
    orderStatusWorker("finished", orderId);
  }, 30000);
};
