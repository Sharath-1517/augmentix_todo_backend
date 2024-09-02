const dotenv = require("dotenv").config();
const db = require("../db");
const express = require("express");
const routes = require("../routes/Todo");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 5050;

app.use(cors({ origin: ["https://augmentix-todo-frontend.vercel.app/"] }));
app.use(bodyParser.json({ extended: true }));
const whitelist = ["*"];

app.use((req, res, next) => {
  const origin = req.get("referer");
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
