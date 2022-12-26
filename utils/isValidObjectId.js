const ObjectId = require('mongoose').Types.ObjectId;

const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = isValidObjectId;
