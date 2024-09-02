const dotenv = require("dotenv").config();
const db = require("./db");
const express = require("express");
const routes = require("./routes/Todo");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 5050;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
