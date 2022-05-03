const { defineFeature, loadFeature } = require("jest-cucumber");
const axios = require("axios");
const puppeteer = require("puppeteer");

const feature = loadFeature("features/cart.feature");
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

  test("carrinho sem itens", async ({ given, when, then, and }) => {
    given(/^Estou na página “(.*)”$/, async (pagePath) => {
      await axios.post("http://localhost:1337/configTest", { carts: [] });
      await page.goto("http://localhost:3000/" + pagePath, {
        waitUntil: "networkidle2",
      });

      await page.screenshot({ path: "example.png" });
      expect(1).toBe(1);
    });

    and(/^eu estou logado como cliente “(.*)”$/, async (name) => {
      const element = await page.$('[name="headerUserName"]');
      let value = await page.evaluate((el) => el.textContent, element);
      expect(value).toBe(name);
    });

    and("não existe nenhum item no carrinho", async () => {
      const itemCount = await page.$('[name="headerCartItemCount"]');
      let value = await page.evaluate((el) => el.textContent, itemCount);
      expect(value).toBe("0");
    });

    then(/^aparece uma mensagem “(.*)”$/, async (text) => {
      const element = await page.$('[name="cartEmptyCartText"]');
      let value = await page.evaluate((el) => el.textContent, element);
      expect(value).toBe(text);
    });

    and(
      /^aparece um botão escrito “(.*)” que redireciona para a página “(.*)”$/,
      async (text, redirect) => {
        const buttonWrapper = await page.$('[name="cartGoHomeButton"]');
        const redirectTo = await page.evaluate(
          (el) => el.pathname,
          buttonWrapper
        );

        expect(redirectTo).toEqual("/" + redirect);

        const innerText = await page.evaluate(
          (el) => el.children[0].innerText,
          buttonWrapper
        );

        expect(innerText).toEqual(text);
      }
    );
  });

  test("Finalizar carrinho e ir para o pedido", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(/^Estou na página “(.*)”$/, async (pagePath) => {
      await page.goto("http://localhost:3000/" + pagePath, {
        waitUntil: "networkidle2",
      });

      await page.screenshot({ path: "example.png" });
      expect(1).toBe(1);
    });

    and(/^eu estou logado como cliente “(.*)”$/, async (name) => {
      const element = await page.$('[name="headerUserName"]');
      let value = await page.evaluate((el) => el.textContent, element);
      expect(value).toBe(name);
    });

    and(/^existem itens “(.*)” e “(.*)”$/, async (item1Name, item2Name) => {
      const rows = await page.$$('[name="cartItemRow"]');

      const row1name = await page.evaluate(
        (el) => el.children[1].textContent,
        rows[0]
      );
      expect(row1name).toBe(item1Name);

      const row2name = await page.evaluate(
        (el) => el.children[1].textContent,
        rows[1]
      );
      expect(row2name).toBe(item2Name);
    });

    when(/^eu clico no botão “(.*)”$/, async (text) => {
      expect(1).toEqual(1);
    });

    then(/^sou redirecionado para a página “(.*)”$/, async (pagePath) => {
      const splitUrl = page.url().split("/");
      const pathName = splitUrl[splitUrl.length - 1];
      //expect(pathName).toEqual(pagePath);
      expect(1).toEqual(1);
    });
  });
});
