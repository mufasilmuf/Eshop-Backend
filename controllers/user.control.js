const db = require("../models/");
const bcrypt = require("bcryptjs");

const User = db.users;

exports.singUp = async (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data.email == req.body.email) {
        res.status(403).json({
          message: "Try any other email, this email is already registered!",
        });
        return;
      }
    })
    .catch(() => {
      try {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          const newUser = new User({
            password: hash,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
          });

          newUser
            .save()
            .then((data) => {
              res.status(200).json({
                message: "User Created Successfully!",
                result: data,
                status: "OK",
              });
            })
            .catch((err) => {
              res.status(401).json({ message: err });
            });
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    });
};
