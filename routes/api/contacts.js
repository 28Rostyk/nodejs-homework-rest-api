const express = require("express");
const { validateBody } = require("../../utils");
const { isValidId, authenticate } = require("../../middlewares");

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

router.get("/", authenticate, getContacts);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), postContact);

router.delete("/:contactId", authenticate, isValidId, deleteContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  changeContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  changeFavoriteContact
);

module.exports = router;
