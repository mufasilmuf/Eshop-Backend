const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");

exports.Auth = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(403).json({ message: "This email has not been registered!" });
    return;
  }
  const isPasswordValidation = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (isPasswordValidation) {
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        isAdim: user.isAdmin,
        phone_number: user.phone_number,
      },
      "secret100",
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({
      email: user.email,
      name: user.last_name,
      role: user.role,
      isAuthenticated: true,
      token: token,
    });
  } else {
    res.status(401).json({ message: "Invalid Credentials!" });
  }
};

/* 
Logins for generte a token..

For Admin:
{
 "email": "mufasil@gmail.com",
 "password":"12345678"
} 

For User:
{
 "email": "mufeeth@gmail.com",
 "password":"12345678"
} 
*/
