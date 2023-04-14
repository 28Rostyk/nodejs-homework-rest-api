const { ctrlWrapper } = require("../utils");

const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");
const { query } = require("express");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, ...query },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email ");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const postContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
  // const result = await Contact.create(req.body);
  // res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

const changeContact = async (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { contactId: id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const changeFavoriteContact = async (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { contactId: id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  changeContact: ctrlWrapper(changeContact),
  changeFavoriteContact: ctrlWrapper(changeFavoriteContact),
};
