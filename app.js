const express = require("express");
const bodyParser = require("body-parser");

const errors = require("./general_utils/errors");
const errorHandler = require("./general_utils/errorHandler");

const generateId = require("./receipt_utils/idGenerator");
const validateReceipt = require("./receipt_utils/receiptValidator");
const scoreCalculator = require("./receipt_utils/scoreCalculator");

const port = 3000;
const app = express();

const receipts = new Map();
const invalidRoute = /^\/receipts/;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/receipts/process", (req, res, next) => {
  try {
    if (Object.keys(req.body).length == 0) {
      throw new errors.BadRequestError(
        "INVALID RECEIPT: Received invalid format OR empty receipt"
      );
    }
    let receipt = req.body;
    let receiptValFlag = validateReceipt(receipt);
    let receiptPoints = scoreCalculator(receipt);
    if (receiptValFlag instanceof errors.BadRequestError) {
      throw receiptValFlag;
    }
    if (receiptPoints instanceof Error) {
      throw new errors.BadRequestError(
        "INVALID RECEIPT: One or more of the fields in this receipt is inconsistent"
      );
    }
    receipt.points = receiptPoints;
    let id = generateId();
    while (receipts.has(id)) {
      id = generateId();
    }
    receipts.set(id, receipt);
    res.status(200).send({ id: id });
  } catch (error) {
    next(error);
  }
});

app.get("/receipts/:id/points", (req, res, next) => {
  try {
    let receiptID = req.params.id;
    if (!receipts.has(receiptID)) {
      throw new errors.BadRequestError(
        "INVALID RECEIPT ID: Receipt ID does not exist"
      );
    } else {
      receipt = receipts.get(receiptID);
      res.status(200).send({ points: receipt.points });
    }
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  try {
    if (!req.url.match(/^\/receipts/)) {
      throw new Error("No resource found error");
    }
    next();
  } catch (error) {
    next(error);
  }
});

app.route(/^\/receipts/).all((req, res, next) => {
  try {
    throw new errors.BaseURLError("Please hit a valid endpoint");
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
