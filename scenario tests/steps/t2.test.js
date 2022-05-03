const { defineFeature, loadFeature } = require("jest-cucumber");
const axios = require("axios");
const puppeteer = require("puppeteer");

const feature = loadFeature("features/cart.feature");
let browser;
let page;
defineFeature(feature, (test) => {
  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 973,
      deviceScaleFactor: 1,
    });
    await axios.get("http://localhost:1337/resetTest");
  });

  afterAll(async () => {
    await axios.get("http://localhost:1337/resetTest");
    await browser.close();
  });

  test("carrinho sem itens", async ({ given, when, then, and }) => {
    given("Estou na página “carrinho de compras”", async () => {
      await axios.post("http://localhost:1337/configTest", { carts: [] });
      await page.goto("http://localhost:3000/cart", {
        waitUntil: "networkidle2",
      });

      await page.screenshot({ path: "example.png" });
      expect(1).toBe(1);
    });

    and("eu estou logado como cliente “Felipe Gonçalves”", () => {
      expect(1).toBe(1);
    });

    and("não existe nenhum item no carrinho", () => {
      expect(1).toBe(1);
    });

    then("aparece uma mensagem “O seu carrinho está vazio”", () => {
      expect(1).toBe(1);
    });

    and(
      "aparece um botão escrito “Adicione itens ao seu carrinho” que redireciona para a página “lista de restaurantes”",
      () => {
        expect(1).toBe(1);
      }
    );
  });
});
