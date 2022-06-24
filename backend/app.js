const express = require("express");

const app = express();

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "jkanksjda",
      title: "First server",
      content: "This is coming from the server",
    },
    {
      id: "lnbkajbsdas",
      title: "Second server",
      content: "This is coming from the second server",
    },
  ];

  return res.status(200).json({ posts: posts });
});

module.exports = app;
