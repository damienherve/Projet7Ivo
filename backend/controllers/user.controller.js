const db = require("../config/db.config.js");
const User = db.user;
const Profile = db.profile;

exports.findAll = async (req, res) => {
  User.findAll({
    attributes: [
      ["uuid", "userId"],
      ["email", "email"],
    ],
    include: [
      {
        model: Profile,
        attributes: ["fullName"],
      },
    ],
  }).then((users) => {
    res.send(users);
  });
};

exports.delete = async (req, res) => {
  console.log("REQUEST", req);

  try {
    const user = req.user;
    // User must exist, and user can only delete his own account, or be an admin
    if (user) {
      if (user.id === parseInt(req.params.id) || user.role === 1) {
        user.email = null;
        user.fullName = "Account deleted";
        user.password = null;
        await user.save();
        res.sendStatus(204);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(404);
  }
};
