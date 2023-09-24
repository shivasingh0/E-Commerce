const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db/config");
const User = require("./db/users");
const Product = require('./db/product')
const app = express();

// Database connection
connectToDatabase();

app.use(express.json());
app.use(cors());

//  Sign-up - API
const register = async (req, res) => {
  let newUser = new User(req.body);
  let result = await newUser.save();
  result = result.toObject();
  delete result.password
  res.send(result);
};
app.post("/register", register);

//  Log-in - API
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

//  Product - API
const product = async(req, res) => {
  let newProduct = new Product(req.body);
  let result = await newProduct.save()
  res.send(result);
}
app.post('/add-product', product)

//  Display Product API
const displayProduct = async(req,res) =>{
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products)
  } else {
    res.send({ result : 'No Product Found' })
  }
}
app.get('/products',displayProduct)

app.listen(5000);
