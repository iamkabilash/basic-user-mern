require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors"); // to connect to frontend
const { deleteOne, findByIdAndDelete } = require("./models/Users");

app.use(express.json()); // to pass json in post req of body.
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
