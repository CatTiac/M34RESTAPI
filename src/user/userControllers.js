const jwt = require("jsonwebtoken");
const User = require("./userModel");

exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log(1);
    //sign = create a token(param = key name: what is stored, basis for algorithm)
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
    console.log(2);
    res.status(200).send({ user: newUser.username, token });
    console.log(3);
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
    console.log(4);
  }
};

exports.loginUser = async (req, res) => {
  try {
    res.status(200).send({ user: req.user.username });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { username: req.user.username },
      { password: req.body.password },
    );
    if (updatedUser.modifiedCount > 0) {
      res.status(200).send({ message: "Successfully updated" });
    } else {
      throw new Error("Did not update");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne( {
      [req.params.filterKey]: req.params.deleteVal,
    });
    console.log(1);
    if (deletedUser.deletedCount > 0) {
      res.status(200).send( { message: 'Deleted user' } )
      console.log(2);
    } else {
      throw new Error('Nope');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};
