const CustomError = require("../extensions/custom-error");

let arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
class VigenereCipheringMachine {
  constructor(mode = true) {
    this.mode = mode;
  }

  getArrayOfIndexes(
    message,
    indexArrayMessage,
    key,
    indexArrayKey) {
    for (let i = 0; i < message.length; i++) {
      if (!message[i].match(/[A-Z]/i)) {
        indexArrayMessage.push(message[i]);
      }
      arr_EN.find(function (element, index) {
        if (element === message[i]) {
          indexArrayMessage.push(index)
        }
      });
    }

    for (let i = 0; i < key.length; i++) {
      arr_EN.find(function (element, index) {
        if (element === key[i]) {
          indexArrayKey.push(index)
        }
      });
    }
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error();
    message = message.toUpperCase().split('');
    key = key.toUpperCase().split('');
    let indexArrayMessage = [];
    let indexArrayKey = [];

    this.getArrayOfIndexes(message, indexArrayMessage, key, indexArrayKey);

    let encryptedMessage = [];
    let j = 0;
    for (let i = 0; i < indexArrayMessage.length; i++) {
      if (typeof indexArrayMessage[i] !== 'number') {
        encryptedMessage.push(indexArrayMessage[i]);
      } else {
        if (j > indexArrayKey.length - 1) j = 0;
        let newIndex = (indexArrayMessage[i] + indexArrayKey[j]) % 26;
        encryptedMessage.push(arr_EN[newIndex]);
        j++;
      }
    }

    if (!this.mode) {
      return encryptedMessage.reverse().join('');
    } else {
      return encryptedMessage.join('');
    }
  }

  decrypt(message, key) {
    if (!message || !key) throw new Error();
    message = message.toUpperCase().split('');
    key = key.toUpperCase().split('');
    let indexArrayMessage = [];
    let indexArrayKey = [];

    this.getArrayOfIndexes(message, indexArrayMessage, key, indexArrayKey);


    let encryptedMessage = [];
    let j = 0;
    for (let i = 0; i < indexArrayMessage.length; i++) {
      if (typeof indexArrayMessage[i] !== 'number') {
        encryptedMessage.push(indexArrayMessage[i]);
      } else {
        if (j > indexArrayKey.length - 1) j = 0;
        let newIndex = (indexArrayMessage[i] - indexArrayKey[j]);
        if (newIndex < 0) {
          newIndex = (newIndex + 26) % 26;
        } else {
          newIndex %= 26;
        }
        encryptedMessage.push(arr_EN[newIndex]);
        j++;
      }
    }

    if (!this.mode) {
      return encryptedMessage.reverse().join('');
    } else {
      return encryptedMessage.join('');
    }
  }
}

module.exports = VigenereCipheringMachine;
