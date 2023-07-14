const express = require("express");
const recordRouter = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

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

module.exports = recordRouter;
