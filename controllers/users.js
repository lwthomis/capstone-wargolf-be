const User = require("../models/Users");
const bcrypt = require('bcrypt');
const { reset } = require("nodemon"); 


exports.findUsers = async (req, res) => {
  const users = await User.find();
  res.send({ data: users });
};

exports.createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    isAdmin: req.body.isAdmin
  });

  await user.save();
  res.send({ data: user });
};

exports.findUser = async (req, res) => {
  try {
    const user = await User.findOne({email: req.params.email});
    res.send({ data: user });
  } catch {
    res.status(404).send({ error: "User is not found!" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    Object.assign(user, req.body);
    user.save();
    res.send({ data: user });
  } catch {
    res.status(404).send({ error: "User is not found!" });
  }
};

exports.deleteUser = async (req, res) => {
  const user = await User.findOne({email: req.params.email});
  user.deleteOne(user, (err) => {
    if (err) return next(err);
    res.send({message: 'Deleted'});
  });
};

exports.signInUser = async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user);

    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        res.send({ data: user });

      } else
        res.send("invalid password");
    } else
      res.send("invalid user.");
  } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error occurred.");
    }
};

exports.findUsers = async (req, res) => {
  const users = await User.find();
  res.send({ data: users });
};