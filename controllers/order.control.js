const db = require("../models");
const jwt = require("jsonwebtoken");

const Order = db.orders;
const User = db.users;
const products = db.products;
const addresses = db.addresses;

exports.createOrder = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = await jwt.verify(token, "secret100");
    const user = await User.findOne({ email: decoded.email, role: "user" });

    if (user) {
      const product = await products.findOne({ _id: req.body.product });

      const address = await addresses.findOne({ _id: req.body.address });

      const order = new Order({
        user: user,
        product: product,
        address: address,
        amount: product.price,
        quantity: req.body.quantity,
      });

      order
        .save()
        .then((data) => {
          res.status(200).json({ status: "OK", data: data });
        })
        .catch((err) => {
          res.status(404).json({ status: "ERROR", message: err });
        });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Please Login first to access this endpoint!" });
  }
};
