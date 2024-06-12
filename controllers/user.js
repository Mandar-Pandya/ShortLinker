const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });
  return res.render("login");
};

const handleUserLogin = async (req, res) => {
  const { name, email, password } = req.body;
  const logUser = await User.findOne({
    email,
    password,
  });
  if (!logUser)
    res.render("login", {
      error: "Incorrect email or password",
    });

  const token = setUser(logUser);
  res.cookie("uuid", token);
  return res.redirect("/");
};

module.exports = { handleUserSignup, handleUserLogin };
