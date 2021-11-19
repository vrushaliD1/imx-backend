const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
let whitelistAddresses = fs.readFileSync("./whitelist.json");
let whitelistArray = JSON.parse(whitelistAddresses);
for (let i = 0; i < whitelistArray.length; ++i) {
  whitelistArray[i] = whitelistArray[i].toLowerCase();
}

app.get('/', (req, res) => {
  res.send('Ok')
})

app.post("/check-address", function (req, res) {
  let address = req.body.address;
  if (whitelistArray.includes(address.toLowerCase())) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
