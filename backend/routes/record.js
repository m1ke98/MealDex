const express = require("express");
const recordRouter = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

// Add recipe
recordRouter.route("/record/add").post(async (req, res) => {
  let db_connect = dbo.getDb();
  try {
    const result = await db_connect.collection("recipes").insertOne(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update recipes
recordRouter.route("/record/update/:id").put(async (req, res) => {
  const { id } = req.params;
  let db_connect = dbo.getDb();
  try {
    const { _id, ...updatedFields } = req.body;
    const result = await db_connect
      .collection("recipes")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });
    res.status(201).json({ updateId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = recordRouter;
