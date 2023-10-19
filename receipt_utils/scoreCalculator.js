module.exports = scoreCalculator = (receipt) => {
  try {
    let alphaNumbericCount = 0;
    for (let i = 0; i < receipt.retailer.length; i++) {
      if (
        (receipt.retailer[i] >= "a" && receipt.retailer[i] <= "z") ||
        (receipt.retailer[i] >= "A" && receipt.retailer[i] <= "Z") ||
        (receipt.retailer[i] >= "0" && receipt.retailer[i] <= "9")
      ) {
        alphaNumbericCount++;
      }
    }
    let roundTotal = 0;
    if (Math.floor(receipt.total) == receipt.total) {
      roundTotal = 50;
    }
    let multipleTwentyFive = 0;
    if (receipt.total % 0.25 == 0) {
      multipleTwentyFive = 25;
    }
    let itemCountPoints = Math.floor(receipt.items.length / 2) * 5;
    let itemPoints = 0;
    for (let i = 0; i < receipt.items.length; i++) {
      let itemDescription = receipt.items[i].shortDescription;
      let itemPrice = receipt.items[i].price;
      if (itemDescription.trim().length % 3 == 0) {
        itemPoints += Math.ceil(itemPrice * 0.2);
      }
    }
    let datePoints = 0;
    if (parseInt(receipt.purchaseDate.split("-")[2]) % 2 == 1) {
      datePoints = 6;
    }
    let timePoints = 0;
    let timeHour = parseInt(receipt.purchaseTime.split(":")[0]);
    let timeMinute = parseInt(receipt.purchaseTime.split(":")[1]);
    if (timeHour == 15 || (timeHour == 14 && timeMinute > 0)) {
      timePoints = 10;
    }
    return (
      alphaNumbericCount +
      roundTotal +
      multipleTwentyFive +
      itemCountPoints +
      itemPoints +
      datePoints +
      timePoints
    );
  } catch (error) {
    return error;
  }
};
