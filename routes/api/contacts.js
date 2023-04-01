const express = require("express");

const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContact,
} = require("../../controller");

const {
  addContactValidation,
  patchContactValidation,
} = require("../../schemas");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", addContactValidation, postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", patchContactValidation, changeContact);

module.exports = router;
