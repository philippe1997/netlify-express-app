const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

app.use(cors());
app.use(bodyParser.json());
app.use("/.netlify/functions/api", router);

router.get("/", (req, res) => {
  res.send("something");
});

const { parsed: config } = dotenv.config();

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/resources/search?max_results=9999`;

const auth = {
  username: config.API_KEY,
  password: config.API_SECRET,
};

router.get("/photos", async (req, res) => {
  const response = await axios.get(BASE_URL, {
    auth,
  });
  return res.send(response.data);
});

module.exports.handler = serverless(app);
