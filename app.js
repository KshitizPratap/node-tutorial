const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

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

app.use("/blogs", blogRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
