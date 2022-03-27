exports.getUser = async (req, res) => {
  res.status(200).send(
    JSON.stringify({
      name: "Felipe Gonçalves",
      id: 5,
    })
  );
};
