const express = require("express");
const recordRouter = express.Router();
const { MongoClient } = require("mongodb");
require("dotenv").config();

// MongoDB connection URL and database name
const uri = process.env.ATLAS_URI;
const dbName = "MealDex";

// Create a MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Route to create a new record
recordRouter.route("/record/add").post(async (req, res) => {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Insert a new document into the "records" collection
    const result = await db.collection("recipes").insertOne(req.body);

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
});

module.exports = recordRouter;

// const express = require("express");
// const recordRouter = express.Router();
// const dbo = require("../db/conn");
// const ObjectId = require("mongodb").ObjectId;

// // Route to create a new record
// recordRouter.route("/record/add").post(function (req, response) {
//     let db_connect = dbo.getDb();
//     let newDocument = {
//         name: req.body.name,
//         servings: req.body.servings,
//         ingredients: req.body.ingredients,
//         time: req.body.preparationTime,
//         instructions: req.body.instructions
//     };
//     db_connect.collection("records").insertOne(newDocument, function (err, res) {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }
//         return res.status(201).json(result);
//     });
// });
  
// module.exports = recordRouter;
