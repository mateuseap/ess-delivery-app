const { defineFeature, loadFeature } = require("jest-cucumber");
const axios = require("axios");
const puppeteer = require("puppeteer");
jest.setTimeout(10000);

const feature = loadFeature("features/statusOrder.feature");
let browser;
let page;
defineFeature(feature, (test) => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 973,
      deviceScaleFactor: 1,
    });
  });
  beforeEach(async () => {
    await axios.get("http://localhost:1337/resetTest");
  });

  afterAll(async () => {
    await axios.get("http://localhost:1337/resetTest");
    await browser.close();
  });

  test(`Status de pedido "Confirmado"`, async ({ given, when, then, and }) => {
    given(`Estou na página de "Detalhes do pedido"`, async () => {
      const id = "781c3c25-ddfc-4ee8-9775-f3cfe10a2ba6";
      const timestamp1 = new Date() - 0;
      await axios.post("http://localhost:1337/configTest", {
        orders: [
          {
            id,
            restaurant_id: 2,
            restaurant_name: "Elias",
            user_id: "1",
            orderImage:
              "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
            total_price: 25.5,
            date: "2022-05-03",
            timestamp: timestamp1,
            description: [
              {
                name: "Ogro Burguer com Batata Média",
                price: 25.5,
                item_id: 1,
                photo:
                  "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
                description:
                  "Hamburguer monstro de dar água na boca. ELIASLOL, O MELHOR COZINHEIRO DE LIMOEIRO!",
                quantity: 1,
              },
            ],
            from: "Avenida Caxangá, 634",
            to: "Avenida Jornalista Aníbal Fernandes, 500",
            payment: {},
            status: {
              confirmed: true,
              preparing: false,
              delivering: false,
              finished: false,
            },
            rate: { did: false, stars: 0, feedback_text: "" },
          },
        ],
      });
      await page.goto("http://localhost:3000/details/" + id, {
        waitUntil: "networkidle2",
      });
    });

    and(/^Estou logado como cliente "(.*)"$/, async (name) => {
      const element = await page.$('[name="headerUserName"]');
      let value = await page.evaluate((el) => el.textContent, element);
      expect(value).toBe(name);
    });

    and(
      /^fiz um pedido no Restaurante "(.*)" de valor "(.*)"$/,
      async (rest, price) => {
        const restaurantEl = await page.$('[name="restaurant"]');
        const priceEl = await page.$('[name="price"]');
        let valueRest = await page.evaluate(
          (el) => el.textContent,
          restaurantEl
        );
        let valuePrice = await page.evaluate((el) => el.textContent, priceEl);

        expect(valueRest).toBe(rest);
        expect(valuePrice).toBe(price);
      }
    );

    when(`eu olho pro status do pedido`, async () => {
      expect(1).toBe(1);
    });

    then(`eu vejo que indica "Confirmado"`, async (msg) => {
      const confirmedEl = await page.$('[name="CONFIRMADO"]');
      let confirmedValue = await page.evaluate(
        (el) => el.textContent,
        confirmedEl
      );
      const preparingEl = await page.$('[name="preparing"]');
      const deliveringEl = await page.$('[name="delivering"]');
      const finishedEl = await page.$('[name="finished"]');
      expect(confirmedValue).toBe("Confirmado");
      expect(preparingEl).toBe(null);
      expect(deliveringEl).toBe(null);
      expect(finishedEl).toBe(null);
    });
  });

  test(`Status de pedido "Em preparo"`, async ({ given, when, then, and }) => {
    given(`Estou na página de "Detalhes do pedido"`, async () => {
      const id = "781c3c25-ddfc-4ee8-9775-f3cfe10a2ba6";
      const timestamp1 = new Date() - 0;
      await axios.post("http://localhost:1337/configTest", {
        orders: [
          {
            id,
            restaurant_id: 2,
            restaurant_name: "Elias",
            user_id: "1",
            orderImage:
              "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
            total_price: 25.5,
            date: "2022-05-03",
            timestamp: timestamp1,
            description: [
              {
                name: "Ogro Burguer com Batata Média",
                price: 25.5,
                item_id: 1,
                photo:
                  "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
                description:
                  "Hamburguer monstro de dar água na boca. ELIASLOL, O MELHOR COZINHEIRO DE LIMOEIRO!",
                quantity: 1,
              },
            ],
            from: "Avenida Caxangá, 634",
            to: "Avenida Jornalista Aníbal Fernandes, 500",
            payment: {},
            status: {
              confirmed: true,
              preparing: true,
              delivering: false,
              finished: false,
            },
            rate: { did: false, stars: 0, feedback_text: "" },
          },
        ],
      });
      await page.goto("http://localhost:3000/details/" + id, {
        waitUntil: "networkidle2",
      });
    });

    and(/^Estou logado como cliente "(.*)"$/, async (name) => {
      const element = await page.$('[name="headerUserName"]');
      let value = await page.evaluate((el) => el.textContent, element);
      expect(value).toBe(name);
    });

    and(
      /^fiz um pedido no Restaurante "(.*)" de valor "(.*)"$/,
      async (rest, price) => {
        const restaurantEl = await page.$('[name="restaurant"]');
        const priceEl = await page.$('[name="price"]');
        let valueRest = await page.evaluate(
          (el) => el.textContent,
          restaurantEl
        );
        let valuePrice = await page.evaluate((el) => el.textContent, priceEl);

        expect(valueRest).toBe(rest);
        expect(valuePrice).toBe(price);
      }
    );

    when(`eu olho pro status do pedido`, async () => {
      expect(1).toBe(1);
    });

    then(`eu vejo que indica "Confirmado" e "Em preparo"`, async (msg) => {
      const confirmedEl = await page.$('[name="CONFIRMADO"]');
      let confirmedValue = await page.evaluate(
        (el) => el.textContent,
        confirmedEl
      );
      const preparingEl = await page.$('[name="preparing"]');
      let preparingValue = await page.evaluate(
        (el) => el.textContent,
        preparingEl
      );
      const deliveringEl = await page.$('[name="delivering"]');
      const finishedEl = await page.$('[name="finished"]');
      expect(confirmedValue).toBe("Confirmado");
      expect(preparingValue).toBe("Em preparo");
      expect(deliveringEl).toBe(null);
      expect(finishedEl).toBe(null);
    });
  });

  test(`Status de pedido "Saiu para entrega"`, async ({
    given,
    when,
    then,
    and,
  }) => {
    given(`Estou na página de "Detalhes do pedido"`, async () => {
      const id = "781c3c25-ddfc-4ee8-9775-f3cfe10a2ba6";
      const timestamp1 = new Date() - 0;
      await axios.post("http://localhost:1337/configTest", {
        orders: [
          {
            id,
            restaurant_id: 2,
            restaurant_name: "Elias",
            user_id: "1",
            orderImage:
              "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
            total_price: 25.5,
            date: "2022-05-03",
            timestamp: timestamp1,
            description: [
              {
                name: "Ogro Burguer com Batata Média",
                price: 25.5,
                item_id: 1,
                photo:
                  "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
                description:
                  "Hamburguer monstro de dar água na boca. ELIASLOL, O MELHOR COZINHEIRO DE LIMOEIRO!",
                quantity: 1,
              },
            ],
            from: "Avenida Caxangá, 634",
            to: "Avenida Jornalista Aníbal Fernandes, 500",
            payment: {},
            status: {
              confirmed: true,
              preparing: true,
              delivering: true,
              finished: false,
            },
            rate: { did: false, stars: 0, feedback_text: "" },
          },
        ],
      });
      await page.goto("http://localhost:3000/details/" + id, {
        waitUntil: "networkidle2",
      });
    });

    and(/^Estou logado como cliente "(.*)"$/, async (name) => {
      const element = await page.$('[name="headerUserName"]');
      let value = await page.evaluate((el) => el.textContent, element);
      expect(value).toBe(name);
    });

    and(
      /^fiz um pedido no Restaurante "(.*)" de valor "(.*)"$/,
      async (rest, price) => {
        const restaurantEl = await page.$('[name="restaurant"]');
        const priceEl = await page.$('[name="price"]');
        let valueRest = await page.evaluate(
          (el) => el.textContent,
          restaurantEl
        );
        let valuePrice = await page.evaluate((el) => el.textContent, priceEl);

        expect(valueRest).toBe(rest);
        expect(valuePrice).toBe(price);
      }
    );

    when(`eu olho pro status do pedido`, async () => {
      expect(1).toBe(1);
    });

    then(
      `eu vejo que indica "Confirmado", "Em preparo" e "Saiu para entrega"`,
      async (msg) => {
        const confirmedEl = await page.$('[name="CONFIRMADO"]');
        let confirmedValue = await page.evaluate(
          (el) => el.textContent,
          confirmedEl
        );
        const preparingEl = await page.$('[name="preparing"]');
        let preparingValue = await page.evaluate(
          (el) => el.textContent,
          preparingEl
        );
        const deliveringEl = await page.$('[name="delivering"]');
        let deliveringValue = await page.evaluate(
          (el) => el.textContent,
          deliveringEl
        );
        const finishedEl = await page.$('[name="finished"]');
        expect(confirmedValue).toBe("Confirmado");
        expect(preparingValue).toBe("Em preparo");
        expect(deliveringValue).toBe("Saiu para a entrega");
        expect(finishedEl).toBe(null);
      }
    );
  });

  test(`Status de pedido "Finalizado"`, async ({ given, when, then, and }) => {
    given(`Estou na página de "Detalhes do pedido"`, async () => {
      const id = "781c3c25-ddfc-4ee8-9775-f3cfe10a2ba6";
      const timestamp1 = new Date() - 0;
      await axios.post("http://localhost:1337/configTest", {
        orders: [
          {
            id,
            restaurant_id: 2,
            restaurant_name: "Elias",
            user_id: "1",
            orderImage:
              "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
            total_price: 25.5,
            date: "2022-05-03",
            timestamp: timestamp1,
            description: [
              {
                name: "Ogro Burguer com Batata Média",
                price: 25.5,
                item_id: 1,
                photo:
                  "https://img.itdg.com.br/tdg/images/recipes/000/312/870/355695/355695_original.jpg",
                description:
                  "Hamburguer monstro de dar água na boca. ELIASLOL, O MELHOR COZINHEIRO DE LIMOEIRO!",
                quantity: 1,
              },
            ],
            from: "Avenida Caxangá, 634",
            to: "Avenida Jornalista Aníbal Fernandes, 500",
            payment: {},
            status: {
              confirmed: true,
              preparing: true,
              delivering: true,
              finished: true,
            },
            rate: { did: false, stars: 0, feedback_text: "" },
          },
        ],
      });
      await page.goto("http://localhost:3000/details/" + id, {
        waitUntil: "networkidle2",
      });
    });

    and(/^Estou logado como cliente "(.*)"$/, async (name) => {
      const element = await page.$('[name="headerUserName"]');
      let value = await page.evaluate((el) => el.textContent, element);
      expect(value).toBe(name);
    });

    and(
      /^fiz um pedido no Restaurante "(.*)" de valor "(.*)"$/,
      async (rest, price) => {
        const restaurantEl = await page.$('[name="restaurant"]');
        const priceEl = await page.$('[name="price"]');
        let valueRest = await page.evaluate(
          (el) => el.textContent,
          restaurantEl
        );
        let valuePrice = await page.evaluate((el) => el.textContent, priceEl);

        expect(valueRest).toBe(rest);
        expect(valuePrice).toBe(price);
      }
    );

    when(`eu olho pro status do pedido`, async () => {
      expect(1).toBe(1);
    });

    then(
      `eu vejo que indica "Confirmado", "Em preparo", "Saiu para entrega" e "Finalizado"`,
      async (msg) => {
        const confirmedEl = await page.$('[name="CONFIRMADO"]');
        let confirmedValue = await page.evaluate(
          (el) => el.textContent,
          confirmedEl
        );
        const preparingEl = await page.$('[name="preparing"]');
        let preparingValue = await page.evaluate(
          (el) => el.textContent,
          preparingEl
        );
        const deliveringEl = await page.$('[name="delivering"]');
        let deliveringValue = await page.evaluate(
          (el) => el.textContent,
          deliveringEl
        );
        const finishedEl = await page.$('[name="finished"]');
        let finishedValue = await page.evaluate(
          (el) => el.textContent,
          finishedEl
        );
        expect(confirmedValue).toBe("Confirmado");
        expect(preparingValue).toBe("Em preparo");
        expect(deliveringValue).toBe("Saiu para a entrega");
        expect(finishedValue).toBe("Finalizado");
      }
    );
  });
});
