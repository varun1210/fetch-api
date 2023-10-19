const { BadRequestError } = require("../general_utils/errors");

module.exports = validateReceipt = (receipt) => {
  try {
    if (!("retailer" in receipt) || receipt.retailer == "") {
      throw new BadRequestError("INVALID RECEIPT: Retailer name required!");
    }
    if (!("purchaseDate" in receipt) || receipt.purchaseDate == "") {
      throw new BadRequestError("INVALID RECEIPT: Purchase date required!");
    }
    if (!("purchaseTime" in receipt) || receipt.purchaseDate == "") {
      throw new BadRequestError("INVALID RECEIPT: Purchase time required!");
    }
    if (!("items" in receipt)) {
      throw new BadRequestError("INVALID RECEIPT: Purchase contains no items!");
    }
    if (!("total" in receipt)) {
      throw new BadRequestError(
        "INVALID RECEIPT: Purchase does not contain a total!"
      );
    }
    return true;
  } catch (error) {
    return error;
  }
};
