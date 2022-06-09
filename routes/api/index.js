const auth = require("./auth");
const users = require("./users");
const movies = require("./movies");

module.exports = {
  authRouter: auth,
  usersRouter: users,
  moviesRouter: movies,
};
