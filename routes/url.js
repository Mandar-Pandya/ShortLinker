const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetShortId,
  handleGetAnalytics,
} = require("../controllers/url");
const URL = require("../models/url");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/:shortId", handleGetShortId);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
