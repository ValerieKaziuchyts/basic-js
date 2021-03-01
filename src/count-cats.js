const CustomError = require("../extensions/custom-error");

module.exports = function countCats(matrix) {
  let cats = 0;
  for (let item of matrix) {
      item.filter(elem => elem === '^^' ? cats++ : null);
  }
  return cats;
};
