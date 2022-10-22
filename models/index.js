//url for dataBase
const dbconfig = require("../config/db.config");

//import the mongoose as common
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbconfig.url;

db.users = require("../models/users.model")(mongoose);
db.addresses = require("../models/addresses.model")(mongoose);
db.orders = require("../models/orders.model")(mongoose);
db.products = require("../models/products.model")(mongoose);
db.protfolioForm = require('../models/protfolioForm.model')(mongoose);

module.exports = db;
