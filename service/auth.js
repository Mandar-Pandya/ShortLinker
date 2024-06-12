const jwt = require('jsonwebtoken')
const secret = "Mandar@1234"

function setUser(user) {
  return jwt.sign({_id:user.id,...user},secret)
}

function getUser(token) {
  if(!token) return null
  return jwt.verify(token,secret)}

module.exports = {
  setUser,
  getUser,
};
