const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  if (!Array.isArray(arr)) throw new Error();
  let transformedArr = [];

  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case '--discard-next':
        i++;
        break;
      case '--discard-prev':
        if (transformedArr.length !== 0 && arr[i-2] !== '--discard-next') {
          transformedArr.pop();
        }
        break;
      case '--double-next':
        if (i < arr.length - 1) transformedArr.push(arr[i+1]);
        break;
      case '--double-prev':
        if (i > 0 && arr[i-2] !== '--discard-next') transformedArr.push(arr[i-1]);
        break;
      default:
        transformedArr.push(arr[i]);
    }
  }

  return transformedArr;
};
