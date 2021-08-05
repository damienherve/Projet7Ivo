const db = require("../config/db.config.js");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const authConfig = require("../config/auth.config.js");

const generateToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    authConfig.secret,
    {
      expiresIn: "24h",
    }
  );
};

exports.signup = async (req, res) => {
  if (!req.body.fullName || !req.body.email || !req.body.password) {
    res.sendStatus(400);
    return;
  }

  const createUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  try {
    const user = await User.create(createUser);
    const response = user.toJSON();
    delete response.password;
    delete response.role;
    response.token = generateToken(user.id);
    res.status(201).json(response);
  } catch (err) {
    console.error("ERROR", err);
    res.sendStatus(404);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.sendStatus(404);
    }

    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.sendStatus(401);
        }
        return res.status(200).json({
          userId: user.id,
          token: generateToken(user.id),
        });
      })
      .catch((error) => {
        return res.status(500).json({
          error,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
