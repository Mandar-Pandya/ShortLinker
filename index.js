const express = require("express");
const urlRoute = require("./routes/url");
const path = require('path')
const staticRoute = require('./routes/staticRouter')

const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = 8000;

connectToMongoDB("mongodb://127.0.0.1:27017/shortLinker").then(() =>
  console.log("connected to Db")
);

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/url", urlRoute);
app.use('/',staticRoute)

app.listen(PORT, () => {
  console.log(`listening on port no ${PORT}`);
});
