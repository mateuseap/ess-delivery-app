exports.getUser = async (req, res) => {
  try {
    res.status(200).send(
      JSON.stringify({
        name: "Felipe Gonçalves",
        id: 5,
      })
    );
  } catch (err) {
    res.status(400).send(err);
  }
};
