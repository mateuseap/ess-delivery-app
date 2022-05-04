const { defineFeature, loadFeature } = require("jest-cucumber");
const axios = require("axios");
const puppeteer = require("puppeteer");

const feature = loadFeature("features/rating.feature");
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
    given(/^Estou logado com o usuário "(.*)"$/, async (user) => {
      await page.goto("http://localhost:3000/history", {
        waitUntil: "networkidle2",
      });
    });

    and("eu estou na página de histórico de pedidos", async () => {
      const splitUrl = page.url().split("/");
      const pathName = splitUrl[splitUrl.length - 1];
      expect(pathName).toEqual("history");
    });

    and("vou avaliar um pedido", async () => {});

    when("eu clico em avaliar um pedido", async () => {
      const element = await page.$('[name="ratingButton"]');
      await element.click();
    });

    and(/^avalio o pedido com (\d+) estrelas$/, async (stars) => {
      const element = await page.$(
        '[aria-label="add rating by typing an integer from 0 to 5 or pressing arrow keys"]'
      );
      await element.click();
      const value = await page.evaluate(
        (el) => el.textContent[el.textContent.length - 1],
        element
      );
      expect(value).toEqual(stars);
    });

    and("deixo a caixa de texto de feedback em branco", async () => {
      await page.screenshot({
        path: "screenshots/rating/tela_sem_texto_de_feedback.png",
      });
    });

    and(/^clico em "(.*)"$/, async (buttonName) => {
      const element = await page.$('[name="sendRateButton"]');
      await element.click();
    });

    then("Eu vejo uma mensagem de sucesso na tela", async () => {
      await page.screenshot({
        path: "screenshots/rating/without_feedback_rating_test.png",
      });

      const element = await page.$('[name="ratingButton"]');
      const value = await page.evaluate((el) => el.textContent, element);
      expect(value).toEqual("Revisar avaliação");
    });
  });

  test("Avaliando um pedido qualquer com texto de feedback", async ({
    given,
    when,
    then,
    and,
  }) => {
    given(/^Estou logado com o usuário "(.*)"$/, async (user) => {
      await page.goto("http://localhost:3000/history", {
        waitUntil: "networkidle2",
      });
    });

    and("eu estou na página de histórico de pedidos", async () => {
      const splitUrl = page.url().split("/");
      const pathName = splitUrl[splitUrl.length - 1];
      expect(pathName).toEqual("history");
    });

    and("vou avaliar um pedido", async () => {});

    when("eu clico em avaliar um pedido", async () => {
      const element = await page.$('[name="ratingButton"]');
      await element.click();
    });

    and(/^avalio o pedido com (\d+) estrelas$/, async (stars) => {
      const element = await page.$(
        '[aria-label="add rating by typing an integer from 0 to 5 or pressing arrow keys"]'
      );
      await element.click();
      const value = await page.evaluate(
        (el) => el.textContent[el.textContent.length - 1],
        element
      );
      expect(value).toEqual(stars);
    });

    and(
      /^escrevo a frase "(.*)" na caixa de texto de feedback$/,
      async (text) => {
        const element = await page.$('[name="ratingFeedbackText"]');
        await element.type(text, { force: true });
      }
    );

    and(/^clico em "(.*)"$/, async (buttonName) => {
      await page.screenshot({
        path: "screenshots/rating/tela_com_texto_de_feedback.png",
      });
      const element = await page.$('[name="sendRateButton"]');
      await element.click();
    });

    then("Eu vejo uma mensagem de sucesso na tela", async () => {
      await page.screenshot({
        path: "screenshots/rating/with_feedback_rating_test.png",
      });

      const element = await page.$('[name="ratingButton"]');
      const value = await page.evaluate((el) => el.textContent, element);
      expect(value).toEqual("Revisar avaliação");
    });
  });

  test("Cancelando uma avaliação", async ({ given, when, then, and }) => {
    given(/^Estou logado com o usuário "(.*)"$/, async (user) => {
      await page.goto("http://localhost:3000/history", {
        waitUntil: "networkidle2",
      });
    });

    and("eu estou na página de histórico de pedidos", async () => {
      const splitUrl = page.url().split("/");
      const pathName = splitUrl[splitUrl.length - 1];
      expect(pathName).toEqual("history");
    });

    and("vou cancelar a avaliação de um pedido", async () => {});

    when("eu clico em avaliar um pedido", async () => {
      const element = await page.$('[name="ratingButton"]');
      await element.click();
    });

    and(/^clico em "(.*)"$/, async (buttonName) => {
      await page.screenshot({
        path: "screenshots/rating/tela_cancelando_uma_avaliação.png",
      });
      const element = await page.$('[name="cancelRateButton"]');
      await element.click();
    });

    then("Eu volto ao estado inicial da tela", async () => {
      await page.screenshot({
        path: "screenshots/rating/cancel_rating_test.png",
      });
    });
  });

  test("Revisando uma avaliação", async ({ given, when, then, and }) => {
    given(/^Estou logado com o usuário "(.*)"$/, async (user) => {
      await page.goto("http://localhost:3000/history", {
        waitUntil: "networkidle2",
      });
    });

    and("eu estou na página de histórico de pedidos", async () => {
      const splitUrl = page.url().split("/");
      const pathName = splitUrl[splitUrl.length - 1];
      expect(pathName).toEqual("history");
    });

    and("vou revisar uma avaliação", async () => {});

    when("eu clico em revisar avaliação do pedido", async () => {
      const elements = await page.$$('[name="ratingButton"]');
      await elements[1].click();
    });

    and("eu vejo minha avaliação feita na tela", async () => {
      await page.screenshot({
        path: "screenshots/rating/tela_revisando_uma_avaliação.png",
      });
    });

    and(/^clico em "(.*)"$/, async (buttonName) => {
      const element = await page.$('[name="backButton"]');
      await element.click();
    });

    then("Eu volto ao estado inicial da tela", async () => {
      await page.screenshot({
        path: "screenshots/rating/review_rating_test.png",
      });
    });
  });
});
