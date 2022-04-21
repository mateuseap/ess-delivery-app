const { ManipulateDatabase } = require("../utils/db");
const jwt_decode = require("jwt-decode");

exports.getCart = async (req, res) => {
  try {
    decoded_auth = jwt_decode(req.headers.authorization);

    const table = new ManipulateDatabase("carts");

    cart_data = table.query({
      inner: {
        nameObjToQuery: "carts",
        matchId: `user_id=${decoded_auth.userId}`,
      },
    });

    res.status(200).send(JSON.stringify(cart_data));
  } catch (err) {
    res.status(500).send(err);
  }
};

function createNewCart(user_id, rest_id, rest_name, item, amountToChange) {
  return {
    user_id: user_id,
    rest_id: rest_id,
    rest_name: rest_name,
    total: item.price,
    items: [{ ...item, quantity: amountToChange }],
  };
}

exports.postCart = async (req, res) => {
  try {
    const body = req.body;

    const decoded_auth = jwt_decode(req.headers.authorization);
    const table = new ManipulateDatabase("carts");

    let cart_data = table.query({
      inner: {
        nameObjToQuery: "carts",
        matchId: `user_id=${decoded_auth.userId}`,
      },
    });

    //se usuario ja tiver um carrinho, atualiza, caso contrario cria um novo carrinho
    if (cart_data) {
      if (cart_data.rest_id !== body.rest_id)
        throw new Error("Restaurant Id doesn't match cart's current id");
      //caso o item ja esteja no carrinho, atualiza sua quantidade, caso contrario adiciona o novo item
      const index = cart_data.items.findIndex(
        (item) => item.item_id === body.item.item_id
      );

      if (index != -1) {
        cart_data.items[index].quantity += body.amountToChange;

        if (cart_data.items[index].quantity <= 0)
          cart_data.items.splice(index, 1);
      } else {
        //previne que se retire um item q nao esta no carrinho
        if (body.amountToChange < 1)
          throw new Error("Impossible to remove non-existent item");
        cart_data.items.push({ ...body.item, quantity: body.amountToChange });
      }
    } else {
      cart_data = createNewCart(
        decoded_auth.userId,
        body.rest_id,
        body.rest_name,
        body.item,
        body.amountToChange
      );
    }

    cart_data.total = cart_data.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const compareFunction = (item) => item.user_id == decoded_auth.userId;
    table.replaceOrAppend(compareFunction, cart_data);

    res.status(200).send(cart_data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
