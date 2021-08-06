const db = require("../config/db.config.js");

exports.findAll = async (req, res) => {
  try {
    console.log("TEST1");
    const users = await db.user.findAll({
      attributes: ["id", "fullName", "email", "role", "createdAt", "updatedAt"],
    });
    console.log("Users", users);
    res.status(200).json(users);
    console.log("TEST3");
  } catch (err) {
    console.log("ERROR", err);
    res.sendStatus(404);
  }
};

exports.delete = async (req, res) => {
  console.log("REQUEST", req);

  try {
    const user = await db.user.findOne({
      where: {
        id: parseInt(req.params.id),
      },
    });

    // if user not found, return error
    if (!user) {
      return res.sendStatus(404);
    }
    // We can't delete an admin user
    if (user.role === 1) {
      return res.sendStatus(401);
    }

    // Soft delete the user
    user.email = null;
    user.fullName = "Account deleted";
    user.password = null;
    user.role = 0;
    await user.save();
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};
