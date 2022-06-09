const express = require("express");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");

const { Movie, schemas } = require("../../models/movie");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const result = await Movie.find({ owner: _id }, "-createdAt -updatedAt", {
      skip,
      limit: Number(limit),
    }).populate("owner", "email");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/add", authenticate, async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { _id } = req.user;
    const data = { ...req.body, owner: _id };
    const result = await Movie.create(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/", authenticate, async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await Movie.findOneAndDelete(id);
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.json({ message: "Movie deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
