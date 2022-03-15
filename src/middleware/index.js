const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/userModel");

exports.hashPassword = async (req, res, next) => {
  try {
    //Below - encrypting the password
    //8 is how many times the password runs through hash
    req.body.password = await bcrypt.hash(req.body.password, 8);
    //next finishes function and moves onto controller functions
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.comparePassword = async (req, res, next) => {
  try {
    //Find user, compares input to stored password
    //req.user creates new key value pair/fetches existing
    req.user = await User.findOne({ username: req.body.username });
    if (await bcrypt.compare(req.body.password, req.user.password)) {
      next();
    } else {
      throw new Error("Incorrect input");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.checkToken = async (req, res, next) => {
  try {
    //Below - Method chain - takes token string and removes Bearer
    //verify decodes token by running it backwards (token, secret)
    const decodedToken = await jwt.verify(
      req.header("Authorization").replace("Bearer ", ""), process.env.SECRET);
    // const decodedToken = await jwt.verify(req.header("Authorization").replace("Bearer ", ""), process.env.SECRET);
    //Below - Assigns decoded token to req.user with unique id
    req.user = await User.findById(decodedToken._id);
    if (req.user) {
      next();
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};
