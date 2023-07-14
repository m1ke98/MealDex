const request = require("supertest");
const express = require("express");
const dbo = require("../db/conn");
const recordRouter = require("../routes/record");

describe("Record API", () => {
  let app;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use("/", recordRouter);
    await dbo.connectToServer();
  });

  after(async () => {
    await dbo.closeConnection();
  });
  describe.skip("POST /record/add", () => {
    it("Add a recipe", async () => {
      const recordData = {
        name: "Bucatini all'Amatriciana",
        servings: 4,
        ingredients: [
          { name: "extra-virgin olive oil", quantity: 2, unit: "Tbsp" },
          { name: "guanciale", quantity: 4, unit: "Oz" },
          { name: "crushed red pepper flakes", quantity: 0.5, unit: "tsp" },
          { name: "ground black pepper", quantity: 0.5, unit: "tsp" },
          { name: "minced onion", quantity: 0.75, unit: "cup" },
          { name: "minced garlic", quantity: 2, unit: "cloves" },
          {
            name: "crushed peeled tomatoes",
            quantity: 1,
            unit: "28-Oz. can",
          },
          { name: "Kosher salt", quantity: "", unit: "" },
          { name: "dried bucatini", quantity: 12, unit: "Oz" },
          { name: "finely grated Pecorino", quantity: 1 / 4, unit: "cup" },
        ],
        time: [{ time: 45, unit: "minutes" }],
        instructions: "Cook",
      };

      const response = await request(app)
        .post("/record/add")
        .send(recordData)
        .expect(201);
    });
  });
  describe.skip("POST /record/update/:id", () => {
    it("Update a recipe", async () => {
      const updatedRecipe = {
        _id: "64b1d7acecd5526f06acd846",
        name: "I'm updated",
        servings: 3,
        ingredients: ["spaghetti", "tomatoes", "guanciale"],
        time: ["25 minutes", "medium"],
        instructions:
          "Cook the spaghetti, sauté the guanciale and tomatoes, mix together.",
      };

      const updateResponse = await request(app)
        .put(`/record/update/${updatedRecipe._id}`)
        .send(updatedRecipe)
        .expect(201);
    });
  });
});
