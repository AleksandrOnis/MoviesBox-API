const { Movie } = require("../../models/movie");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const count = await Movie.find({ owner: _id }).count();
    if (!count) res.json({ result: 0, total_pages: 0 });
    const total_pages = Math.ceil(count / limit);
    const result = await Movie.find({ owner: _id }, "-updatedAt", {
      skip,
      limit: Number(limit),
    }).sort("-createdAt");
    res.json({ result, total_pages });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
