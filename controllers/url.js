const shortid = require("shortid");

const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Please provide a url" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetShortId(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) return res.json({ error: "No result found" });

  res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({
    shortId,
  });

  if (!entry) return res.json({ msg: "Not found" });
  const totalNoOfVisits = entry.visitHistory.length;
  return res.json({ totalVisit: totalNoOfVisits });
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetShortId,
  handleGetAnalytics,
};
