const express = require("express");
const { validateBody, isValidId } = require("../../utils");

const { schemas } = require("../../models/contact");
const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  changeContact,
  changeFavoriteContact,
} = require("../../controller");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(schemas.addSchema), postContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  changeContact
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  changeFavoriteContact
);

module.exports = router;
