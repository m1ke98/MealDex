const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./.env" });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/record"));

const dbo = require("./db/conn");
 
app.listen(port, async () => {
  await dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;