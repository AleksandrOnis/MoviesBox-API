const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const { User, schemas } = require("../../models/user");

const signup = async (req, res, next) => {
  try {
    const { error } = schemas.signup.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new createError(409, "Email in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.create({ name, email, password: hashPassword });
    res.status(201).json({
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
