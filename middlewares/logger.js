const { model } = require("mongoose");

const logger = (req, res, next) => {
  console.log("Nova requisição em: ", Date(), req.url);
  next(); // jump node
};

module.exports = logger;