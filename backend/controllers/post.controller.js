const db = require("../config/db.config.js");
const Post = db.post;
const User = db.user;

exports.findAllPosts = async (req, res) => {
  const posts = await Post.findAll({
    where: {
      postId: null,
    },
    include: [
      {
        model: User,
        attributes: ["fullName"],
      },
    ],
  });
  res.send(posts);
};

exports.findPost = async (req, res) => {
  const post = await db.post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "text", "claps"],
    include: [
      {
        model: User,
        attributes: ["fullName"],
      },
      {
        model: db.post,
        as: "comments",
        include: { model: User, attributes: ["fullName"] },
        attributes: ["id", "title", "text", "claps"],
      },
    ],
  });
  res.send(post);
};

exports.addPost = async (req, res) => {
  if (!req.body.title || !req.body.text) {
    return res.sendStatus(404);
  }

  try {
    const post = await db.post.create({
      title: req.body.title,
      text: req.body.text,
      userId: parseInt(req.user.id),
    });
    res.status(201).json(post.toJSON());
  } catch (err) {
    console.log("ERROR", err);
    res.sendStatus(404);
  }
};

exports.addComment = async (req, res) => {
  const postId = parseInt(req.params.id);

  if (!req.body.title || !req.body.text) {
    return res.sendStatus(404);
  }

  console.log("REQUEST OK");
  try {
    const post = await db.post.findOne({
      where: {
        id: postId,
      },
    });
    console.log("POST", post);
    const comment = await post.createComment({
      title: req.body.title,
      text: req.body.text,
      userId: parseInt(req.user.id),
    });
    res.status(201).json(comment.toJSON());
  } catch (err) {
    console.log("ERROR", err);
    res.sendStatus(404);
  }
};

exports.addClap = async (req, res) => {
  const postId = parseInt(req.params.id);

  try {
    const post = await db.post.findOne({
      where: {
        id: postId,
      },
    });
    post.claps = post.claps + 1;
    await post.save();
    res.status(201).json(post.toJSON());
  } catch (err) {
    res.sendStatus(404);
  }
};
