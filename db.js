const dotenv = require("dotenv").config();
const { default: mongoose } = require("mongoose");
const TodoModels = require("./models/Todo");

mongoose
  .connect(process.env.DB_CONNECT_URI)
  .then(() => {
    console.log("🍀 Successfully connected to MongoDB Database...");
  })
  .catch((reason) => {
    throw new Error("Error connecting to MongoDB Database...\n", reason);
  });
