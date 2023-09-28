const bcrypt = require("bcryptjs");
const { registerSchema } = require("../validators/auth-validator");
const prisma = require("../models/prisma");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.user.create({
      data: value,
    });
    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "dwavdvbbgbhmjmjmgrr",
      { expiresIn: process.env.JWT_EXPIRE }
    );
    // console.log(value);
    // console.log(error);
    // res.json("innniii");
    res.status(201).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
