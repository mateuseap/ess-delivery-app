const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    res.redirect("/api");
  } catch (err) {
    console.error(err);
    res.status(400).send({});
  }
});

app
  .route("/api")
  .get(async (req, res) => {
    try {
      res.status(200).send("heyyy");
    } catch (err) {
      console.error(err);
      res.status(400).send({});
    }
  })
  .post(async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      res.status(200).send(JSON.stringify({ res: "Got it" }));
    } catch (err) {
      console.error(err);
      res.status(400).send({});
    }
  });

app.listen(1337, (_) => {
  console.log("Server running on port 1337");
});
