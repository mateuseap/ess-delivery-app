const { defineFeature, loadFeature } = require("jest-cucumber");
const axios = require("axios");
const puppeteer = require("puppeteer");

const { getRestaurants } = require("../test_data/restaurants");

const feature = loadFeature("features/fazer_pedido.feature");
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

  test("O cliente vai escolher os produtos que deseja", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(
      /^Selecionei um restaurante e estou na página “(.*)”$/,
      async (pagePath) => {
        await axios.post("http://localhost:1337/configTest", {
          restaurants: getRestaurants.restaurants,
        });
        await page.goto("http://localhost:3000/" + pagePath, {
          waitUntil: "networkidle0",
        });
        await page.screenshot({ path: "example3.png" });
        await page.click(`[name="BOTAO"]`);

        await page.screenshot({ path: "example4.png" });
        const splitUrl = page.url().split("/");
        const pathName = splitUrl[splitUrl.length - 2];
        expect(pathName).toEqual("menu");
      }
    );

    when("Clico em um produto para adiciona-lo ao carrinho", async () => {
      await axios.post("http://localhost:1337/configTest", { carts: [] });
      await page.click(`[nome="ADICIONAR"]`);
      await page.screenshot({ path: "example5.png" });

      const itemCountElement = await page.$('[name="headerCartItemCount"]');
      let value = await page.evaluate((el) => el.textContent, itemCountElement);
      expect(value).toEqual("1");
    });

    then("O carrinho é atualizado e o valor total aumenta", async () => {
      await page.goto("http://localhost:3000/cart", {
        waitUntil: "networkidle0",
      });
      await page.screenshot({ path: "example6.png" });
      const itemCountElement = await page.$('[name="cartTotalPrice"]');
      let value = await page.evaluate((el) => el.textContent, itemCountElement);
      value = Number(value.replace(/[^0-9.-]+/g, "")) / 100;
      expect(value > 0).toEqual(true);
    });

    and("Clico em confirmar", async () => {
      await page.click(`[name="cartMakeOrderButton"]`);
      await page.screenshot({ path: "example7.png" });
    });

    then(
      "Sou redirecionado para a próxima etapa e recebo uma confirmação",
      async () => {
        const nome = await page.$('[name="CONFIRMADO"]');
        let value = await page.evaluate((el) => el.textContent, nome);
        expect(value).toEqual("Confirmado");
      }
    );
  });

  test("visualizing orders history page with days filter", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(/^Estou na pagina do restaurante de id "(.*)"$/, async (id) => {
      await page.goto("http://localhost:3000/menu/" + id);
      await page.screenshot({ path: "example8.png" });

      const splitUrl = page.url().split("/");
      let page_id = splitUrl[splitUrl.length - 1];
      expect(page_id).toEqual("1");
    });
    and("O carrinho já possui um item de outro restaurante", async () => {
      const itemCountElement = await page.$('[name="headerCartItemCount"]');
      let value = await page.evaluate((el) => el.textContent, itemCountElement);
      expect(value).toEqual("2");
    });
    when("Tento adicionar um item", async () => {
      await page.click(`[nome="ADICIONAR"]`);
      await page.screenshot({ path: "example9.png" });
    });
    then("O item não é adicionado ao carrinho", async () => {
      const itemCountElement = await page.$('[name="headerCartItemCount"]');
      let value = await page.evaluate((el) => el.textContent, itemCountElement);
      expect(value).toEqual("2");
    });
  });
});
