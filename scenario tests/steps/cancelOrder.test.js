const { defineFeature, loadFeature } = require("jest-cucumber");
const axios = require("axios");
const puppeteer = require("puppeteer");

const feature = loadFeature("features/cancelOrder.feature");
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

  test(`Cancelamento de pedido com status "Confirmado", e não "Em preparo"`, async ({
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
              preparing: false,
              delivering: false,
              finished: false,
            },
            rate: { did: false, stars: 0, feedback_text: "" },
          },
        ],
      });
      await page.goto("http://localhost:3000/details/" + id, {
        waitUntil: "networkidle0",
      });
    });

    and(/^Estou logado como cliente "(.*)"$/, async (name) => {
      const element = await page.waitForSelector('[name="headerUserName"]');
      let value = await page.evaluate((el) => el.textContent, element);
      expect(value).toBe(name);
    });

    and(
      /^fiz um pedido no Restaurante "(.*)" de valor "(.*)"$/,
      async (rest, price) => {
        const restaurantEl = await page.waitForSelector('[name="restaurant"]');
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

    and(
      `o status do pedido indica "Confirmado", mas não "Em preparo"`,
      async () => {
        const confirmedEl = await page.waitForSelector('[name="CONFIRMADO"]');
        const preparingEl = await page.$('[name="preparing"]');
        let valueConfirmed = await page.evaluate(
          (el) => el.textContent,
          confirmedEl
        );
        expect(valueConfirmed).toBe("Confirmado");
        expect(preparingEl).toBe(null);
      }
    );

    when(`eu tento cancelar o pedido`, async () => {
      await page.click('[name="cancelOrderButton"]');
    });

    then(/^eu recebo uma mensagem "(.*)"$/, async (msg) => {
      const msgEl = await page.waitForSelector('[class="rrt-title"]');
      let msgValue = await page.evaluate((el) => el.textContent, msgEl);
      expect(msgValue).toBe(msg);
    });
  });

  test(`Cancelamento de pedido com status "Em preparo" e "sem atraso" na entrega`, async ({
    given,
    when,
    then,
    and,
  }) => {
    given(`Estou na página de "Detalhes do pedido"`, async () => {
      const id = "781c3c25-ddfc-4ee8-9775-f3cfe10a2ba6";
      const timestamp1 = new Date() - 30 * 60 * 1000;
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
        waitUntil: "networkidle0",
      });
    });

    and(/^Estou logado como cliente "(.*)"$/, async (name) => {
      const element = await page.waitForSelector('[name="headerUserName"]');
      let value = await page.evaluate((el) => el.textContent, element);
      expect(value).toBe(name);
    });

    and(
      /^fiz um pedido no Restaurante "(.*)" de valor "(.*)"$/,
      async (rest, price) => {
        const restaurantEl = await page.waitForSelector('[name="restaurant"]');
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

    and(`o status do pedido indica "Em preparo"`, async () => {
      const preparingEl = await page.waitForSelector('[name="preparing"]');
      let valuePreparing = await page.evaluate(
        (el) => el.textContent,
        preparingEl
      );
      expect(valuePreparing).toBe("Em preparo");
    });

    and(`o pedido está "sem atraso" na entrega`, async () => {
      const lateEl = await page.$('[name="late"]');
      expect(lateEl).toBe(null);
    });

    when(`eu tento cancelar o pedido`, async () => {
      await page.click('[name="cancelOrderButton"]');
    });

    then(/^eu recebo uma mensagem "(.*)"$/, async (msg) => {
      const msgEl = await page.waitForSelector('[class="rrt-title"]');
      let msgValue = await page.evaluate((el) => el.textContent, msgEl);
      expect(msgValue).toBe(msg);
    });
  });

  test(`Cancelamento de pedido com status "Em preparo" e "com atraso" na entrega`, async ({
    given,
    when,
    then,
    and,
  }) => {
    given(`Estou na página de "Detalhes do pedido"`, async () => {
      const id = "781c3c25-ddfc-4ee8-9775-f3cfe10a2ba6";
      const timestamp1 = new Date() - 100 * 60 * 1000;
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
        waitUntil: "networkidle0",
      });
    });

    and(/^Estou logado como cliente "(.*)"$/, async (name) => {
      const element = await page.waitForSelector('[name="headerUserName"]');
      let value = await page.evaluate((el) => el.textContent, element);
      expect(value).toBe(name);
    });

    and(
      /^fiz um pedido no Restaurante "(.*)" de valor "(.*)"$/,
      async (rest, price) => {
        const restaurantEl = await page.waitForSelector('[name="restaurant"]');
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

    and(`o status do pedido indica "Em preparo"`, async () => {
      const preparingEl = await page.waitForSelector('[name="preparing"]');
      let valuePreparing = await page.evaluate(
        (el) => el.textContent,
        preparingEl
      );
      expect(valuePreparing).toBe("Em preparo");
    });

    and(`o pedido está "com atraso" na entrega`, async () => {
      const lateEl = await page.waitForSelector('[name="late"]');
      let valueLate = await page.evaluate((el) => el.textContent, lateEl);
      expect(valueLate).toBe("A entrega do pedido está atrasada!");
    });

    when(`eu tento cancelar o pedido`, async () => {
      await page.click('[name="cancelOrderButton"]');
    });

    then(/^eu recebo uma mensagem "(.*)"$/, async (msg) => {
      const msgEl = await page.waitForSelector('[class="rrt-title"]');
      let msgValue = await page.evaluate((el) => el.textContent, msgEl);
      expect(msgValue).toBe(msg);
    });
  });
});
