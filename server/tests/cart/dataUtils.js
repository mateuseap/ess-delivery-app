exports.getCartDefaultResponse = {
  user_id: "1",
  rest_id: 0,
  rest_name: "Almir quentinhas",
  total: 29,
  items: [
    {
      name: "Frango a milanesa",
      quantity: 1,
      price: 11,
      item_id: 2,
      photo:
        "https://img.itdg.com.br/tdg/images/recipes/000/021/372/357312/357312_original.jpg?mode=crop&width=710&height=400",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum velit mi, elementum non interdum ut, mattis si",
    },
    {
      name: "Cubos de carne ao molho madeira",
      quantity: 1,
      price: 13,
      item_id: 3,
      photo:
        "https://www.divenetoalimentos.com.br/images/produtos/picadinho-de-cubos-de-carne-com-molho-congelado.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum velit mi, elementum non interdum ut, mattis si",
    },
  ],
};

exports.postCartDefaultReq = {
  rest_id: 0,
  rest_name: "Almir quentinhas",
  item: {
    name: "Frango a milanesa",
    price: 11,
    item_id: 2,
    photo:
      "https://img.itdg.com.br/tdg/images/recipes/000/021/372/357312/357312_original.jpg?mode=crop&width=710&height=400",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum velit mi, elementum non interdum ut, mattis si",
  },
  amountToChange: 1,
};

exports.postCartRemoveReq = {
  rest_id: 0,
  rest_name: "Almir quentinhas",
  item: {
    name: "Frango a milanesa",
    price: 11,
    item_id: 2,
    photo:
      "https://img.itdg.com.br/tdg/images/recipes/000/021/372/357312/357312_original.jpg?mode=crop&width=710&height=400",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum velit mi, elementum non interdum ut, mattis si",
  },
  amountToChange: -1,
};

exports.postCartDefaultResponse = {
  user_id: "1",
  rest_id: 0,
  rest_name: "Almir quentinhas",
  total: 40,
  items: [
    {
      name: "Frango a milanesa",
      quantity: 2,
      price: 11,
      item_id: 2,
      photo:
        "https://img.itdg.com.br/tdg/images/recipes/000/021/372/357312/357312_original.jpg?mode=crop&width=710&height=400",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum velit mi, elementum non interdum ut, mattis si",
    },
    {
      name: "Cubos de carne ao molho madeira",
      quantity: 1,
      price: 13,
      item_id: 3,
      photo:
        "https://www.divenetoalimentos.com.br/images/produtos/picadinho-de-cubos-de-carne-com-molho-congelado.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum velit mi, elementum non interdum ut, mattis si",
    },
  ],
};

exports.postCartNewCartResponse = {
  user_id: "1",
  rest_id: 0,
  rest_name: "Almir quentinhas",
  total: 11,
  items: [
    {
      name: "Frango a milanesa",
      quantity: 1,
      price: 11,
      item_id: 2,
      photo:
        "https://img.itdg.com.br/tdg/images/recipes/000/021/372/357312/357312_original.jpg?mode=crop&width=710&height=400",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum velit mi, elementum non interdum ut, mattis si",
    },
  ],
};
