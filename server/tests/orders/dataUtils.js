exports.getOrderDefaultResponse = [
  {
    id: "10bbd312-47d8-4513-894f-a6556620e763",
    restaurant_id: 2,
    restaurant_name: "Elias",
    user_id: "1",
    orderImage:
      "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
    total_price: 31,
    date: "2022-04-20",
    description: [
      {
        name: "Ogro Burguer com Batata Média",
        quantity: 1,
        item_id: 1,
        price: 25.5,
      },
      { name: "Coca-cola lata", quantity: 1, item_id: 2, price: 5.5 },
    ],
    from: "Avenida Conselheiro Rosa e Silva, 1086",
    to: "Avenida Jornalista Aníbal Fernandes, 500",
    payment: {
      name: "Meu cartão NuBank",
      type: "Cartão de Débito",
      code: "XXXX-XXXX-XXXX-XXXX",
      security_code: "XXX",
    },
    status: {
      confirmed: true,
      preparing: true,
      delivering: true,
      finished: true,
    },
    rate: { did: false, stars: 0, feedback_text: "" },
  },
  {
    id: "749c347c-4038-418d-b4a9-9e6d22329d19",
    restaurant_id: 0,
    restaurant_name: "Almir quentinhas",
    user_id: "1",
    orderImage:
      "http://receitasmais.com.br/wp-content/uploads/2013/04/Panqueca-de-mussarela-e-presunto-1200x675.jpg",
    total_price: 11,
    date: "2022-04-15",
    description: [
      { name: "Panqueca de carne", quantity: 1, item_id: 4, price: 11 },
    ],
    from: "Avenida Conselheiro Rosa e Silva, 1086",
    to: "Avenida Jornalista Aníbal Fernandes, 500",
    payment: { name: null, type: "Dinheiro", code: null, security_code: null },
    status: {
      confirmed: true,
      preparing: true,
      delivering: true,
      finished: true,
    },
    rate: { did: true, stars: 3.5, feedback_text: "Descrição" },
  },
  {
    id: "296f2c5b-385f-4db9-aca0-1aeb0194d862",
    restaurant_id: 0,
    restaurant_name: "Almir quentinhas",
    user_id: "1",
    orderImage:
      "http://receitasmais.com.br/wp-content/uploads/2013/04/Panqueca-de-mussarela-e-presunto-1200x675.jpg",
    total_price: 11,
    date: "2022-04-13",
    description: [
      {
        name: "Panqueca de queijo e presunto",
        quantity: 1,
        item_id: 5,
        price: 11,
      },
    ],
    from: "Avenida Conselheiro Rosa e Silva, 1086",
    to: "Avenida Jornalista Aníbal Fernandes, 500",
    forma_pagamento: {
      name: null,
      type: "Dinheiro",
      code: null,
      security_code: null,
    },
    status: {
      confirmed: true,
      preparing: true,
      delivering: true,
      finished: true,
    },
    rate: { did: true, stars: 3.5, feedback_text: "Descrição" },
  },
];

exports.postOrdersDefaultRequest = {
  restaurantId: 2,
  rate: {
    stars: 4,
    feedback_text: "",
  },
  orderId: "10bbd312-47d8-4513-894f-a6556620e763",
  daysFilter: 30,
};

exports.postOrderDefaultResponse = [
  {
    id: "10bbd312-47d8-4513-894f-a6556620e763",
    restaurant_id: 2,
    restaurant_name: "Elias",
    user_id: "1",
    orderImage:
      "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
    total_price: 31,
    date: "2022-04-20",
    description: [
      {
        name: "Ogro Burguer com Batata Média",
        quantity: 1,
        item_id: 1,
        price: 25.5,
      },
      { name: "Coca-cola lata", quantity: 1, item_id: 2, price: 5.5 },
    ],
    from: "Avenida Conselheiro Rosa e Silva, 1086",
    to: "Avenida Jornalista Aníbal Fernandes, 500",
    payment: {
      name: "Meu cartão NuBank",
      type: "Cartão de Débito",
      code: "XXXX-XXXX-XXXX-XXXX",
      security_code: "XXX",
    },
    status: {
      confirmed: true,
      preparing: true,
      delivering: true,
      finished: true,
    },
    rate: { did: true, stars: 4, feedback_text: "" },
  },
  {
    id: "749c347c-4038-418d-b4a9-9e6d22329d19",
    restaurant_id: 0,
    restaurant_name: "Almir quentinhas",
    user_id: "1",
    orderImage:
      "http://receitasmais.com.br/wp-content/uploads/2013/04/Panqueca-de-mussarela-e-presunto-1200x675.jpg",
    total_price: 11,
    date: "2022-04-15",
    description: [
      { name: "Panqueca de carne", quantity: 1, item_id: 4, price: 11 },
    ],
    from: "Avenida Conselheiro Rosa e Silva, 1086",
    to: "Avenida Jornalista Aníbal Fernandes, 500",
    payment: { name: null, type: "Dinheiro", code: null, security_code: null },
    status: {
      confirmed: true,
      preparing: true,
      delivering: true,
      finished: true,
    },
    rate: { did: true, stars: 3.5, feedback_text: "Descrição" },
  },
  {
    id: "296f2c5b-385f-4db9-aca0-1aeb0194d862",
    restaurant_id: 0,
    restaurant_name: "Almir quentinhas",
    user_id: "1",
    orderImage:
      "http://receitasmais.com.br/wp-content/uploads/2013/04/Panqueca-de-mussarela-e-presunto-1200x675.jpg",
    total_price: 11,
    date: "2022-04-13",
    description: [
      {
        name: "Panqueca de queijo e presunto",
        quantity: 1,
        item_id: 5,
        price: 11,
      },
    ],
    from: "Avenida Conselheiro Rosa e Silva, 1086",
    to: "Avenida Jornalista Aníbal Fernandes, 500",
    forma_pagamento: {
      name: null,
      type: "Dinheiro",
      code: null,
      security_code: null,
    },
    status: {
      confirmed: true,
      preparing: true,
      delivering: true,
      finished: true,
    },
    rate: { did: true, stars: 3.5, feedback_text: "Descrição" },
  },
];

exports.getOrderByIdDefaultResponse = {
  id: "ee5ca86f-b82c-4c60-9fb0-efbd724dc7a5",
  restaurant_id: 0,
  restaurant_name: "Almir quentinhas",
  user_id: "1",
  orderImage:
    "https://img.itdg.com.br/tdg/images/recipes/000/021/372/357312/357312_original.jpg?mode=crop&width=710&height=400",
  total_price: 29,
  date: "2022-05-04",
  timestamp: 1651670756070,
  description: [
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
  from: "Avenida Domingos Ferreira, 1230",
  to: "Avenida Jornalista Aníbal Fernandes, 500",
  payment: {},
  status: {
    confirmed: true,
    preparing: false,
    delivering: false,
    finished: false,
  },
  rate: { did: false, stars: 0, feedback_text: "" },
};
