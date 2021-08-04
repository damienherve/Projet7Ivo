var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

require("./routes/auth.routes")(app);
require("./routes/users.route")(app);
require("./routes/posts.routes")(app);

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

// Create a Server
var server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

const db = require("./config/db.config.js");

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

const test = async () => {
  await db.init();

  const user = await db.user.create({
    fullName: "Damien HERVE",
    email: "test@test.fr",
    password: "123456",
  });
  console.log("POSTS", await user.getPosts());

  const initialPost = await user.createPost({
    title: "Mon Premier Post",
    text: "Une belle connerie",
  });
  console.log("POSTS", await user.getPosts());

  const comment = await initialPost.createComment({
    title: "Chui pas content",
    text: "C dla marde #bullshit",
    userId: 1,
  });

  const commentOfComment = await comment.createComment({
    title: "Moi j'aime bien",
    text: "T'es qu'un con",
    userId: 1,
  });

  const commentsOfPost1 = await initialPost.getComments();
  console.log(
    "Commentaires du Post initial",
    JSON.stringify(commentsOfPost1, null, 2)
  );

  const test = await db.post.findAll({
    where: {
      postId: 1,
    },
    attributes: ["title", "text"],
    include: [
      {
        model: db.user,
        attributes: ["fullName"],
      },
      {
        model: db.post,
        as: "comments",
        include: { model: db.user, attributes: ["fullName"] },
        attributes: ["title", "text"],
      },
    ],
  });

  console.log("TEST", JSON.stringify(test, null, 2));

  // const posts = await db.post.findAll({ include: db.user });
  // console.log(JSON.stringify(posts, null, 2));
};

test();
