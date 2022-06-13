const { Movie } = require("../../models/movie");
const createError = require("http-errors");

const remove = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    const result = await Movie.findOneAndDelete(movieId);
    if (!result) {
      throw new createError(404, "Not found");
    }
    res.json({ message: "Movie was deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
