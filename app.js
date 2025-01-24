const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

const app = express();
const dbURI =
  "mongodb+srv://node-tut:wU9Lr3NkF4mUj6@cluster0.asikm.mongodb.net/Tutorial?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI).then(() => {
  app.listen(3000);
});

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find().then((result) => {
    res.render("index", {
      title: "Home",
      blogs: result,
    });
  });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch(() => {
      res.send("Error while posting the blog");
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((response) => {
      res.render("detailBlog", { title: "Blog", blog: response });
    })
    .catch(() => {
      res.send("Error while fetching the blog");
    });
});

app.delete("/blogs/:id", (req, res) => {
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
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
