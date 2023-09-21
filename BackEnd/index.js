const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db/config");
const User = require("./db/users");
const app = express();

// Database connection
connectToDatabase();

app.use(express.json());
app.use(cors());

// For Sign-up
const register = async (req, res) => {
  let newUser = new User(req.body);
  let result = await newUser.save();
  result = result.toObject();
  delete result.password
  res.send(result);
};
app.post("/register", register);

// For Log-in
const login = async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");

    if (user) {
      res.send(user);
    } else {
      res.send({ result: "User not Found" });
    }
  } else {
    res.send({ result: "Provide required information" });
  }
};
app.post("/login", login);

app.listen(5000);
