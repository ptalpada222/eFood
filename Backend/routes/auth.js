// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require("path");


const mainDirectory = path.join(__dirname,"..","..");
// console.log(mainDirectory);

const homePagePath = path.join(mainDirectory,"/HomePage/index.html");
const loginPagePath = path.join(mainDirectory,"/Login&SignUp/login.html");
// console.log(homePagePath);

// Initiate Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Handle callback after Google has authenticated the user
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: './login' }),
  (req, res) => {
    // Successful authentication, redirect to your desired route
    res.redirect('https://www.youtube.com/');
  }
);


module.exports = router;
