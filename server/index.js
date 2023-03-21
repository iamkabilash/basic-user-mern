const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors"); // to connect to frontend

app.use(express.json()); // to pass json in post req of body.
app.use(cors());

mongoose.connect(
  "mongodb+srv://username_kabi:password_kabi@basic-user.htwpkus.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/getUsers", async (req, res) => {
  try {
    const result = await UserModel.find({});
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});

app.listen(8000, () => {
  console.log("server runs");
});
