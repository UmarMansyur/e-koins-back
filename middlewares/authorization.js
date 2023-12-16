const jwt = require("jsonwebtoken");
const { unauthorized } = require("../helpers/ApiError");
const { JWT_SECRET } = process.env;

module.exports = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return unauthorized("You're not authorized!");
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;

    if (roles.length > 0 && !roles.includes(payload.role)) {
      return unauthorized("You're not authorized!");
    }

    next();
  };
};