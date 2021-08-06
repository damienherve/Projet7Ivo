isAuthenticated = require("../middleware/authValidator");
isAdmin = require("../middleware/adminValidator");
const Post = require("../controllers/post.controller.js");

module.exports = function (app) {
  // Get a list of post (without comments)
  app.get("/api/posts", isAuthenticated, Post.findAllPosts);
  // Get a post with all his comments
  app.get("/api/post/:id", isAuthenticated, Post.findPost);
  // Add a new post
  app.post("/api/post", isAuthenticated, Post.addPost);
  // Add a comment to a post
  app.post("/api/post/:id/comment", isAuthenticated, Post.addComment);
  // Add a clap to a post
  app.post("/api/post/:id/clap", isAuthenticated, Post.addClap);
  // Remove a post/comment (when removing a post, removes all his comments too)
  app.delete("/api/post/:id", isAuthenticated, isAdmin, Post.removePost);
};
