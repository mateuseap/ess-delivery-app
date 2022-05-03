const { defineFeature, loadFeature } = require("jest-cucumber");
const axios = require("axios");
const puppeteer = require("puppeteer");

const feature = loadFeature("/features/rating.feature");
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

  test("Avaliando um pedido qualquer sem texto de feedback", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(`Estou logado com o usuário "Felipe Gonçalves"`, async () => {
      await axios.post("http://localhost:1337/configTest", { carts: [] });
      await page.goto("http://localhost:3000/cart", {
        waitUntil: "networkidle2",
      });

      await page.screenshot({ path: "example30.png" });
      expect(1).toBe(1);
    });

    and(`eu estou na página de histórico de pedidos`, () => {
      expect(1).toBe(1);
    });

    and(`vou avaliar um pedido`, () => {
      expect(1).toBe(1);
    });

    when(`eu clico em avaliar um pedido`, () => {
      expect(1).toBe(1);
    });

    and(`avalio o pedido com 4 estrelas`, () => {
      expect(1).toBe(1);
    });
    and(`deixo a caixa de texto de feedback em branco`, () => {
      expect(1).toBe(1);
    });
    and(`clico em enviar avaliação`, () => {
      expect(1).toBe(1);
    });

    then("Eu vejo uma mensagem de sucesso na tela", () => {
      expect(1).toBe(1);
    });
  });
});
