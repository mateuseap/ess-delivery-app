exports.postTest = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    res.status(200).send(JSON.stringify({ res: "Got it" }));
  } catch (err) {
    console.error(err);
    res.status(400).send({});
  }
};

exports.getTest = async (req, res) => {
  try {
    res.status(200).send("heyyy");
  } catch (err) {
    console.error(err);
    res.status(400).send({});
  }
};
