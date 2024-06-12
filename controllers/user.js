const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const handleUserSignup = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  console.log(req.body);
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
  console.log(logUser);
  if (!logUser)
    res.render("login", {
      error: "Incorrect email or password",
    });

  console.log(logUser);
  const sessionId = uuidv4();
  setUser(sessionId, logUser);
  res.cookie("uuid", sessionId);
  return res.redirect("/");
};

module.exports = { handleUserSignup, handleUserLogin };
