export const userLoadedState = {
  error: false,
  loading: false,
  data: {
    id: "1",
    name: "Felipe Gonçalves",
    photo:
      "https://conteudo.imguol.com.br/c/entretenimento/b3/2021/04/20/brtt-1618944423167_v2_750x750.jpg",
    addresses: [
      "Avenida Jornalista Aníbal Fernandes, 500",
      "Avenida Conselheiro Rosa e Silva, 1086",
    ],
    payment: [
      {
        name: "Meu cartão NuBank",
        type: "Cartão de Débito",
        code: "XXXX-XXXX-XXXX-XXXX",
        security_code: "XXX",
      },
      {
        name: null,
        type: "Dinheiro",
        code: null,
        security_code: null,
      },
    ],
  },
};

export const cartLoadedState = {
  error: false,
  loading: false,
  data: {
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
  },
};

export const menuLoadedState = {
  loading: false,
  error: false,
  data: {
    id: 2,
    name: "Elias",
    photo:
      "https://media-cdn.tripadvisor.com/media/photo-s/05/85/e1/f5/sala-ristorante.jpg",
    addresses: ["Avenida Caxangá, 634"],
    menu: {
      destaqueIndex: 0,
      options: [
        {
          name: "Ogro Burguer com Batata Média",
          price: 25.5,
          item_id: 1,
          photo:
            "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
          description:
            "Hamburguer monstro de dar água na boca. ELIASLOL, O MELHOR COZINHEIRO DE LIMOEIRO!",
        },
        {
          name: "Coca-cola lata",
          price: 5.5,
          item_id: 2,
          photo:
            "https://images-americanas.b2w.io/produtos/4575311740/imagens/coquinha-coca-cola-lata-220ml-desde-1886-sabor/4575311740_1_large.jpg",
          description: "Coquinha geladinha HMMMMM!",
        },
      ],
    },
    rates: [{ user_id: "1", stars: 4.5, feedback_text: "" }],
  },
};

export const restaurantsLoadedState = {
  loading: false,
  error: false,
  data: [
    {
      id: 2,
      name: "Elias",
      photo:
        "https://media-cdn.tripadvisor.com/media/photo-s/05/85/e1/f5/sala-ristorante.jpg",
      addresses: ["Avenida Caxangá, 634"],
      menu: {
        destaqueIndex: 0,
        options: [
          {
            name: "Ogro Burguer com Batata Média",
            price: 25.5,
            item_id: 1,
            photo:
              "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
            description:
              "Hamburguer monstro de dar água na boca. ELIASLOL, O MELHOR COZINHEIRO DE LIMOEIRO!",
          },
          {
            name: "Coca-cola lata",
            price: 5.5,
            item_id: 2,
            photo:
              "https://images-americanas.b2w.io/produtos/4575311740/imagens/coquinha-coca-cola-lata-220ml-desde-1886-sabor/4575311740_1_large.jpg",
            description: "Coquinha geladinha HMMMMM!",
          },
        ],
      },
      rates: [{ user_id: "1", stars: 4.5, feedback_text: "" }],
    },
    {
      id: 3,
      name: "Daylol",
      photo:
        "https://media-cdn.tripadvisor.com/media/photo-s/16/3d/cb/2f/quintal-da-praia.jpg",
      addresses: ["Avenida Bernardo Vieira de Melo, 980"],
      menu: {
        destaqueIndex: 1,
        options: [
          {
            name: "Frango a parmegiana",
            price: 20,
            item_id: 1,
            photo:
              "https://photos.bigoven.com/recipe/hero/fil-de-frango-parmegiana-bcd93f.jpg",
            description: "Melhor parme de piedade e arredores!",
          },
          {
            name: "Frango a milanesa",
            price: 22,
            item_id: 2,
            photo:
              "https://img.itdg.com.br/tdg/images/recipes/000/021/372/357312/357312_original.jpg?mode=crop&width=710&height=400",
            description: "Frango empanado a moda da casa!",
          },
          {
            name: "Guaraná 1L",
            price: 10,
            item_id: 3,
            photo:
              "https://a-static.mlcdn.com.br/1500x1500/refrigerante-guarana-original-antarctica-1-litro/lojasemix/1803p/b4b32c23dd9c6e4d77fa9c37daf6732e.jpg",
            description: "Guaraná 1L",
          },
        ],
      },
      rates: [{ user_id: "1", stars: 4.5, feedback_text: "" }],
    },
    {
      id: 4,
      name: "Alicelol",
      photo:
        "https://vejasp.abril.com.br/wp-content/uploads/2016/12/k-pop-chiken2.jpeg",
      addresses: ["Avenida Abdias de Carvalho, 142"],
      menu: {
        destaqueIndex: 0,
        options: [
          {
            name: "Frango KPOPPER",
            price: 50,
            item_id: 1,
            photo:
              "https://s2.glbimg.com/0X_hlC9TWAJUt6CsKQoSKcQ7hvM=/620x345/e.glbimg.com/og/ed/f/original/2019/06/10/kpop_chickin_4.jpg",
            description: "Idol Chicken para você que é fã dos coreanos :D",
          },
          {
            name: "Água",
            price: 4,
            item_id: 2,
            photo:
              "https://farmaciaindiana.vteximg.com.br/arquivos/ids/206727/7896371000045_0.jpg?v=636748773745400000",
            description: "Garrafa 500ml",
          },
        ],
      },
      rates: [{ user_id: "1", stars: 4.5, feedback_text: "" }],
    },
  ],
};

export const historyLoadedState = {
  loading: false,
  error: false,
  data: [
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
      payment: {
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
  ],
};
