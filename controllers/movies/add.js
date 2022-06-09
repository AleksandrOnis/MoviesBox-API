const { Movie, schemas } = require("../../models/movie");
const createError = require("http-errors");

const add = async (req, res, next) => {
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
};

module.exports = add;
