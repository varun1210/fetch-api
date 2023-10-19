module.exports = generateId = () => {
  let alphaNumeric = "0ab1cde2fg3hi4klm5nop6qrs7tuv8wxy9z";
  let returnString = "";
  for (let i = 0; i < 32; i++) {
    let randomPos = Math.ceil(Math.random() * 1000000) % 35;
    let char = alphaNumeric[randomPos];
    returnString += char;
    if (i == 7 || i == 11 || i == 15 || i == 19) {
      returnString += "-";
    }
  }
  return returnString;
};
