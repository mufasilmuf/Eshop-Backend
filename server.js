const express = require("express");
bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

//it create a webserver....
const app = express();

//it allow to use any corrs origins.....
app.use(cors());

//---------------MiddleWare...................................
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//---------------MiddleWare...................................

//---------------------it connect to data base-------------------
//it created as a immediate invoked function......
(async function () {
  const db = require("./models");
  let client;

  try {
    client = await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (err) {
    console.log("Cannot connect to the database!", err);
    process.exit(1);
  }
})();
//---------------------it connect to data base-------------------

//simple routes for checking the connection........
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to upGrad Eshop application development.",
  });
});

require("./routes/user.rotues")(app);

require("./routes/address.routes")(app);

require("./routes/products.routes")(app);

require("./routes/order.routes")(app);

require("./routes/myuse.routes")(app);

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Runnig on the port number:${PORT}`);
});
