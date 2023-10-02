const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db/config");
const User = require("./Schemas/users");
const Product = require("./Schemas/products");

// import jwt token
const Jwt = require("jsonwebtoken");
const jwtkey = "e-commerce";

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
  delete result.password;
  Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "Something went Wrong try after sometimes..." });
    }

    res.send({ result, auth: token });
  });
};
app.post("/register", register);

//  Log-in - API
const login = async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");

    // using JWt token here
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "Something went Wrong try after sometimes..." });
        }

        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "User not Found" });
    }
  } else {
    res.send({ result: "Provide required information" });
  }
};
app.post("/login", login);

// Add Product - API
const product = async (req, res) => {
  let newProduct = new Product(req.body);
  let result = await newProduct.save();
  res.send(result);
};
app.post("/add-product", product);

//  Display Product API
const displayProduct = async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Product Found" });
  }
};
app.get("/products", displayProduct);

// Delete Product API
const deleteProduct = async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
};
app.delete("/products/:id", deleteProduct);

//  Update Product API
const updateProduct = async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "Record not found" });
  }
};
app.get("/products/:id", updateProduct);

//  Update existing product API
const updateExistingProduct = async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body, // $set is used to set update data
    }
  );
  res.send(result);
};
app.put("/products/:id", updateExistingProduct);

// Search Product API
const searchProduct = async (req, res) => {
  try {
    let result = await Product.find({
      $or: [
        { title: { $regex: req.params.key } },
        { brand: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
      ],
    });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
app.get("/search/:key", searchProduct);

// Card Data - API
const cardProduct = async (req,res) => {
  const { category } = req.query;
  let cardData;
    if (category) {
      // If a category is specified, filter by that category
      cardData = await Product.find({ category });
    } else {
      // If no category is specified, return all card data
      cardData = await Product.find();
    }
    res.send(cardData);
};
app.get("/card", cardProduct);


app.listen(5000);
