const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: "https://sell-sasha.netlify.app",
  optionsSuccessStatus: 200,
  methods: "GET",
};

router.get("/", (req, res) => {
  res.send("something");
});

const BASE_URL = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/resources/search?max_results=9999`;

const auth = {
  username: process.env.API_KEY,
  password: process.env.API_SECRET,
};

app.use(bodyParser.json());
app.use("/.netlify/functions/api", router);

router.get("/photos", cors(corsOptions), async (req, res) => {
  const response = await axios.get(BASE_URL, {
    auth,
  });
  return res.send(response.data);
});

module.exports.handler = serverless(app);
