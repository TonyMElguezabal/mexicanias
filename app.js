const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3030;

const UserModel = require("./models/userModel");

mongoose
  .connect(
    "mongodb+srv://mxadmin:mxadmin@cluster0-q1zfg.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log(`Conecting to MongoDB Mexicanias`);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

///
app.get("/", (req, res) => {
  res.status(200).json({ message: "Home" });
});
app.get("/about", (req, res) => {
  res.status(200).json({ message: "About Mexicanias" });
});
app.get("/items", (req, res) => {
  res.status(200).json({ message: "Items" });
});
app.get("/user", (req, res) => {
  return UserModel.find({}, (err, users) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: "error", message: "Users not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "Users listed",
      data: users,
    });
  });
});

app.post("/user", (req, res) => {
  const newUser = new UserModel(req.body);
  newUser.save((err, user) => {
    if (err) {