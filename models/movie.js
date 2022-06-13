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

    genres_ids: {
      type: [Number],
      default: [],
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
  genres_ids: Joi.array().items(Joi.number()),
  release_date: Joi.string(),
  vote_average: Joi.number(),
  movieId: Joi.number().required(),
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
