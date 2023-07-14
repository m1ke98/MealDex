require("dotenv").config();
const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;
let _connected = false;

module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect();
      // console.log("Successfully connected to the database.");
    } catch (e) {
      console.error(e);
    }

    _db = client.db("MealDex");
    _connected = true;

    return _db === undefined ? false : true;
  },
  getDb: function () {
    return _db;
  },
  closeConnection: function () {
    if (_connected) {
      client.close();
      _connected = false;
      // console.log("Closed the database connection.");
    }
  },
};
