const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middleware");

const router = express.Router();
const User = require("../Models/User");

//ROUTE WITH REGISTER
//ACCESS: Public
//URL: localhost:5000/auth/register
router.post("/register", (req, res) => {
  const { name, age, email, gender, password1, password2 } = req.body;

  if (name.toString().trim() === "")
    return res.status(400).json({ name: "Username is required" });

  if (age.toString().trim() === "")
    return res.status(400).json({ age: "Age is required" });

  if (email.toString().trim() === "")
    return res.status(400).json({ email: "Email is required" });

  if (gender.toString().trim() === "")
    return res.status(400).json({ gender: "Gender is required" });

  if (password1.toString().trim() === "")
    return res.status(400).json({ password1: "Password is required" });

  if (password2.toString().trim() === "")
    return res.status(400).json({ password2: "Confirm password is required" });

  if (password1.toString().trim() !== password2.toString().trim())
    return res.status(400).json({ password2: "Password does not match" });

  const newUser = new User({
    name,
    age,
    email,
    gender,
    password: password1,
  });

  User.findOne({ email })
    .then((user) => {
      if (user) return res.status(400).json({ email: "User already exist" });
      bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            jwt.sign(
              { id: user._id, name: user.name },
              process.env.JWT_SECRET,
              { expiresIn: 36000 }, //10HRS
              (err, token) => {
                if (err) throw err;
                res.status(200).json({
                  token,
                  id: user._id,
                  name: user.name,
                  age: user.age,
                  email: user.email,
                  gender: user.gender,
                });
              }
            );
          })
          .catch((err) => res.status(400).json({ error: err }));
      });
    })
    .catch((err) => {
      return res.status(400).json({ email: "Invalid user details*" });
    });
});

//ROUTE WITH LOGIN
//ACCESS: Public
//URL: localhost:5000/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email.toString().trim() === "")
    return res.status(400).json({ email: "Email is required*" });

  if (password.toString().trim() === "")
    return res.status(400).json({ password: "Password is required*" });

  User.findOne({ email })
    .then((user) => {
      bcrypt.compare(password, user.password).then((ismatched) => {
        if (!ismatched)
          return res.status(400).json({ email: "Invalid user details*" });

        jwt.sign(
          { id: user._id, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: 36000 }, //10HRS
          (err, token) => {
            if (err) return res.status(400).json({ email: "Login failed*" });
            return res.status(200).json({
              token,
              id: user._id,
              name: user.name,
              email: user.email,
            });
          }
        );
      });
    })
    .catch((err) => res.status(400).json({ email: "User does not exist*" }));
});

//GET USER WITH TOKEN
//ACCESS: Protected
//URL: localhost:5000/auth/user
router.get("/user", authMiddleware, (req, res) => {
  const { id } = req.user;
  User.findById(id)
    .select("-password -__v")
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json({ email: "authentication failed*" }));
});

module.exports = router;
