const jwt = require("jsonwebtoken");

function jwtMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ msg: "Authorization failed" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Authorization failed.." });
  }
}

module.exports = jwtMiddleware;
