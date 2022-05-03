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
