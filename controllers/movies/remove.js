const { Movie, schemas } = require("../../models/movie");
const createError = require("http-errors");

const remove = async (req, res, next) => {
  try {
    const { error } = schemas.del.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { movieId } = req.body;
    const { _id } = req.user;
    const result = await Movie.findOneAndDelete({ movieId, owner: _id });
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.json({ message: "Movie was deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
