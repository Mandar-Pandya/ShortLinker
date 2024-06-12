const { getUser } = require("../service/auth");

function restrictToLoggedinUsersOnly(req, res, next) {
  const userUid = req.cookies?.uuid;
  if (!userUid) return res.render("login");

  const user = getUser(userUid);
  if (!user) return res.render("login");

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUsersOnly,
};
