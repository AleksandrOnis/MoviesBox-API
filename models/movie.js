const { Schema, model } = require("mongoose");
const Joi = require("joi");

const movieSchema = Schema(
  {
    title: {
      type: String,
      default: "No Name",
    },
    poster_path: {
      type: String,
      default: "",
    },
    //genre_ids: (4) [28, 12, 10751, 35]
    genresIds: {
      type: [Number],
      default: [],
    },
    release_date: {
      type: String,
      default: "xxxx",
    },
    vote_average: {
      type: String,
      default: "-",
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    overview: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiAddMovieSchema = Joi.object({
  title: Joi.string(),
  poster_path: Joi.string(),
  genresIds: Joi.array().items(Joi.number()),
  release_date: Joi.string(),
  vote_average: Joi.string(),
  id: Joi.string().required(),
  overview: Joi.string(),
});

const Movie = model("movie", movieSchema);

const schemas = {
  add: joiAddMovieSchema,
};

module.exports = {
  Movie,
  schemas,
};
