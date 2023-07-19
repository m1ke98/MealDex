import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function AddRecipe() {
  function createIngredientList(ingredients) {
    const ingredientsArray = ingredients.split(",").map((item) => item.trim());
    const parsedArray = ingredientsArray.map((ingredient) => {
      const parts = ingredient.split(" ");
      const quantity = parseFloat(parts[0]);
      const unitIndex = parts.findIndex((part) => /^[a-zA-Z]+$/.test(part));
      const name = parts.slice(unitIndex + 1).join(" ");
      const unit = parts.slice(1, unitIndex + 1).join(" ");
      return { name, quantity, unit };
    });

    return parsedArray;
  }

  const submit = async () => {
    const recipeName = document.getElementById("recipe-name").value;
    const servings = document.getElementById("servings").value;
    const time = document.getElementById("time").value;
    const ingredients = createIngredientList(
      document.getElementById("ingredients").value
    );
    const instructions = document.getElementById("instructions").value;

    const data = {
      name: recipeName,
      servings: servings,
      ingredients: ingredients,
      time: time,
      instructions: instructions,
    };

    console.log(data);

    try {
      const response = await fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log("Recipe added successfully!");
        console.log("Response:", responseData); // Log the response data
      } else {
        console.error("Failed to add recipe");
        console.log("Response:", responseData); // Log the response data
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="recipe-name"
          label="Recipe Name"
          placeholder="Chicken Noodle Soup"
          variant="standard"
        />
        <TextField
          required
          id="servings"
          label="Servings"
          placeholder="6"
          variant="standard"
        />
        <TextField
          required
          id="time"
          label="Time"
          placeholder="40 minutes"
          variant="standard"
        />
      </div>
      <div>
        <TextField
          required
          id="ingredients"
          label="Ingredients"
          placeholder="1 tbsp butter, 0.5 cup onion, 1/2 cup celery, 4x14.5oz can chicken broth, 1x14.5oz can vegetable broth, 0.5 lb chicken breast, 1.5 cups egg noodles, 1 cup carrots, 0.5 tsp basil, 0.5 tsp oregano"
          multiline
          variant="standard"
        />
      </div>
      <div>
        <TextField
          required
          id="instructions"
          label="Instructions"
          placeholder="Melt butter in a large pot over medium heat. Add onion and celery and cook until just tender, about 5 minutes. Add chicken broth, vegetable broth, chicken, egg noodles, carrots, basil, oregano, salt, and pepper. Stir to combine and bring to a boil. Reduce heat and simmer for 20 minutes."
          multiline
          variant="standard"
        />
      </div>
      <div>
        <Button variant="contained" disableElevation onClick={submit}>
          Submit Recipe
        </Button>
      </div>
    </Box>
  );
}
