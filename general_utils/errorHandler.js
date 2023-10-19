const { BadRequestError, BaseURLError } = require("./errors");

const errorHandler = (error, req, res, next) => {
  if (error instanceof BadRequestError) {
    res.status(400).send({ ERROR: error.message });
  } else if (error instanceof BaseURLError) {
    res.status(404).send({ ERROR: error.message });
  } else if (error.message == "No resource found error") {
    res.status(404).send({ ERROR: "No resource found!" });
  } else {
    res.status(500).send({ ERROR: "Internal server error!" });
  }
};

module.exports = errorHandler;
