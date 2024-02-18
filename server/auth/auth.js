// middleware/auth.js
import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  console.log("backend auth is called", token);
  if (!token) return res.status(401).send("Access denied.");

  jwt.verify(token, "Sarthak Vats", (err, user) => {
    if (err) {
      console.log("jwt-verify error", err);
      return res.status(403).send("Invalid token.");
    }
    console.log("verified");
    req.user = user;
    next();
  });
}

export default authenticateToken;
