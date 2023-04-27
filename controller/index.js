const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContact,
  changeFavoriteContact,
} = require("./contactsControllers");

const {
  register,
  login,
  getCurrent,
  logout,
  userUpdateSubscription,
  updateAvatar,
  verify,
  resendVerifyEmail,
} = require("./authController");

module.exports = {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContact,
  changeFavoriteContact,
  register,
  login,
  getCurrent,
  logout,
  userUpdateSubscription,
  updateAvatar,
  verify,
  resendVerifyEmail,
};
