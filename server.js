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

let whitelistArrayCopy = [...whitelistArray]

for (let i = 0; i < whitelistArray.length; ++i) {
  whitelistArray[i] = whitelistArray[i].toLowerCase();
}

app.get('/', (req, res) => {
  res.send('Ok')
})

app.post("/check-address", function (req, res) {
  let address = req.body.address;
  // console.log(whitelistArrayCopy)
  for (let i = 0; i < whitelistArray.length; i++) {
    if (whitelistArray[i] == '0xb00052bB9842507E64a6AF1112f3aeaEEaFfF0C0'.toLowerCase()) {
      res.send(whitelistArrayCopy[i])
      break;
    }
    else {
      continue;
    }
  }
  res.send(false)
});


app.listen(5000, () => {
  console.log("Listening on port 5000");
});
