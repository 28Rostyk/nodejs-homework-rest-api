const isValidId = require("./isValidid");
const authenticate = require("./authenticate");
const upload = require("./upload");
const resizeFile = require("./jimp");

module.exports = {
  isValidId,
  authenticate,
  upload,
  resizeFile,
};
