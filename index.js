const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = 8000;

connectToMongoDB("mongodb://127.0.0.1:27017/shortLinker").then(() =>
  console.log("connected to Db")
);

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`listening on port no ${PORT}`);
});
