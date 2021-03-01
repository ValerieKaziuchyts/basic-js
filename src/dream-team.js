const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  let arr = [];
  if (!Array.isArray(members)) return false;
  
  for (let item of members) {
    if (typeof item === 'string') {
      arr.push(item.trim().toUpperCase()[0]);
    }
  }
  return arr.sort().join('');
};
