const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json());

app.get("/test", async (req, res) => {
  try{
    res.status(200).send("heyyy")
  }
  catch(err){
    console.error(err)
    res.status(400).send({})
  }
  
})

app.post("/test", async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    res.status(200).send(JSON.stringify({res:"Got it"}));
  } catch (err) {
    console.error(err)
    res.status(400).send({})
  }
})

app.listen(1337, _ => {
  console.log("Server running on port 1337");
});

