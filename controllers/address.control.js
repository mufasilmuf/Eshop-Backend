const db = require("../models");
const jwt = require("jsonwebtoken");
//it have the access for the collection address...
const Address = db.addresses;
const User = db.users;

exports.AddAdress = async (req, res) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11ZmVldGhAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MzY2MTM5NTgsImV4cCI6MTYzNjcwMDM1OH0.lc1A-aNlXd49hvTAHatKz9EXcfCPRmK7RWuCTXKRhk0";

  try {
    const decode = await jwt.verify(token, "secret100");
    const user = await User.findOne({ email: decode.email });
    if (user) {
      const newAddress = new Address({
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        street: req.body.street,
        contactNumber: req.body.contactNumber,
        landmark: req.body.landmark,
        zipCode: req.body.zipcode,
        user: user,
      });
      newAddress
        .save()
        .then((data) => {
          res.status(200).json({
            status: "OK",
            message: "Address Added Successfully",
            data: data,
          });
        })
        .catch(() => {
          res.status(403).json({ status: "ERROR" });
        });
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: "Please Login first to access this endpoint!" });
  }
};
