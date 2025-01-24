const Blog = require("../models/blogs");

const blog_index = (req, res) => {
  Blog.find().then((result) => {
    res.render("index", {
      title: "Home",
      blogs: result,
    });
  });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch(() => {
      res.send("Error while posting the blog");
    });
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create" });
};

const blog_details = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((response) => {
      res.render("detailBlog", { title: "Blog", blog: response });
    })
    .catch(() => {
      res.render("404", { title: "Blog not found" });
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({
        redirect: "/blogs",
      });
    })
    .catch(() => {
      res.send("Error while deleting the post");
    });
};

module.exports = {
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_details,
  blog_index,
};
