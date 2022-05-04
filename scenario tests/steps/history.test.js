const { defineFeature, loadFeature } = require("jest-cucumber");
const axios = require("axios");
const puppeteer = require("puppeteer");

const { getRestaurants } = require("../test_data/restaurants");
const { getOrders } = require("../test_data/orders");

const feature = loadFeature("features/historico_de_pedidos.feature");
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

    test("visualizing a empty orders history page", async ({
        given,
        when,
        then,
        and,
    }) => {
        given(
            /^I'm logged as a User "Felipe Gonçalves"$/,
            async () => {
                await page.goto("http://localhost:3000/", {
                    waitUntil: "networkidle2",
                });
                const splitUrl = page.url().split("/");
                const pathName = splitUrl[splitUrl.length - 1];
                expect(pathName).toEqual('home');
            });

        and(
            /^I haven't made my first order yet$/,
            async () => {
                await axios.post("http://localhost:1337/configTest", {
                    restaurants: getRestaurants.restaurants,
                });
                await axios.post("http://localhost:1337/configTest", {
                    orders: [],
                });
            });

        when(
            /^I access the "(.*)" page$/,
            async (pagePath) => {
                await page.goto("http://localhost:3000/" + pagePath, {
                    waitUntil: "networkidle2",
                });
                await page.screenshot({ path: "example4.png" });
                const splitUrl = page.url().split("/");
                const pathName = splitUrl[splitUrl.length - 1];
                expect(pathName).toEqual(pagePath);
            });

        then(
            /^I see a notification telling me that there are no previous orders to be shown$/,
            async () => {
                const nome = await page.$('[name="emptyOrdersHistory"]');
                let value = await page.evaluate((el) => el.textContent, nome);
                expect(value).toEqual("Não há pedidos registrados em sua conta");
            });
    });

    test("visualizing orders history page with days filter", async ({
        given,
        when,
        then,
        and,
    }) => {
        given(
            /^I'm logged as a User "Felipe Gonçalves"$/,
            async () => {
                await axios.post("http://localhost:1337/configTest", {
                    restaurants: getRestaurants.restaurants,
                });
                await axios.post("http://localhost:1337/configTest", {
                    orders: getOrders.orders,
                });
                await page.goto("http://localhost:3000/", {
                    waitUntil: "networkidle2",
                });
                const splitUrl = page.url().split("/");
                const pathName = splitUrl[splitUrl.length - 1];
                expect(pathName).toEqual('home');
            });

        when(
            /^I access the "(.*)" page$/,
            async (pagePath) => {
                await page.goto("http://localhost:3000/" + pagePath, {
                    waitUntil: "networkidle2",
                });
                await page.screenshot({ path: "example4.png" });
                const splitUrl = page.url().split("/");
                const pathName = splitUrl[splitUrl.length - 1];
                expect(pathName).toEqual(pagePath);
            });

        and(
            /^I select "(.*)" in days filter$/,
            async (filter) => {
                await page.select('[name="daysFilter"]', filter);
                await page.screenshot({ path: "example4.png" });
            });

        then(
            /^I see all the orders I made in the past 15 days$/,
            async () => {
                const nome = await page.$('[name="pagination"]');
                await page.screenshot({ path: "example4.png" });
                let value = await page.evaluate((el) => el.textContent, nome);
                expect(value).to("1");
            });
    });
});
