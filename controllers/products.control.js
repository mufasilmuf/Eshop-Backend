const db = require("../models");
const Products = db.products;
const jwt = require("jsonwebtoken");
const User = db.users;

exports.findAllproducts = async (req, res) => {
  try {
    let product = await Products.find({});
    res.status(200).send(product);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

exports.findAllCategories = async (req, res) => {
  Products.find({}, { _id: 0, category: 1 })
    .then((data) => {
      res.status(200).send(data.map((categ) => categ.category));
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
};

exports.findById = async (req, res) => {
  const product = Products.find({ _id: req.params.id })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

//below three function are accessable by Admin...

exports.addProducts = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decode = await jwt.verify(token, "secret100");
    const Admin = await User.find({ email: decode.email, role: "Admin" });

    if (!Admin) {
      res
        .status(403)
        .json({ message: "You are not authorized to access this endpoint!" });
    }

    if (Admin) {
      const newProduct = new Products({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        manufacturer: req.body.manufacturer,
        availableItems: req.body.availableItems,
        imageURL: req.body.imageURL,
      });

      newProduct
        .save()
        .then((data) => {
          res.status(200).json({ status: "OK", data: data });
        })
        .catch((err) => {
          res.status(401).json({ message: err });
        });
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: "Please Login first to access this endpoint!" });
  }
};

exports.deleteProductById = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decode = await jwt.verify(token, "secret100");
    const Admin = await User.find({ email: decode.email, role: "Admin" });

    if (!Admin) {
      res
        .status(403)
        .json({ message: "You are not authorized to access this endpoint!" });
    }

    if (Admin) {
      const deleteProduct = await Products.deleteOne({ _id: req.params.id })
        .then((deleteProduct) => {
          res.status(200).json({ status: "OK", data: deleteProduct });
        })
        .catch((err) => {
          res.status(404).json({ message: err });
        });
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: "Please Login first to access this endpoint!" });
  }
};

exports.updateProductsById = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decode = await jwt.verify(token, "secret100");
    const Admin = await User.find({ email: decode.email, role: "Admin" });

    if (!Admin) {
      res
        .status(403)
        .json({ message: "You are not authorized to access this endpoint!" });
    }

    if (Admin) {
      const updateProduct = await Products.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            availableItems: req.body.availableItems,
            imageURL: req.body.imageURL,
          },
        }
      )
        .then((updateProduct) => {
          res.status(200).json({ status: "OK", data: updateProduct });
        })
        .catch(() => {});
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: "Please Login first to access this endpoint!" });
  }
};
