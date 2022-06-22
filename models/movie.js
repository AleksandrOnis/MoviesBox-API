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

    genre_ids: {
      type: [Number],
      default: [15],
    },
    release_date: {
      type: String,
      default: "xxxx",
    },
    vote_average: {
      type: Number,
    },
    movieId: {
      type: Number,
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
  genre_ids: Joi.array().items(Joi.number()),
  release_date: Joi.string(),
  vote_average: Joi.number(),
  movieId: Joi.number().required(),
  overview: Joi.string(),
});

const joiDelMovieSchema = Joi.object({
  title: Joi.string(),
  poster_path: Joi.string(),
  genre_ids: Joi.array().items(Joi.number()),
  release_date: Joi.string(),
  vote_average: Joi.number(),
  movieId: Joi.number().required(),
  overview: Joi.string(),
});

const Movie = model("movie", movieSchema);

const schemas = {
  add: joiAddMovieSchema,
  del: joiDelMovieSchema,
};

module.exports = {
  Movie,
  schemas,
};
