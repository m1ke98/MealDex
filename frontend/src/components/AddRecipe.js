import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function AddRecipe() {
  let ingredients;
  const [form, setForm] = useState({
    name: "",
    servings: "",
    ingredients: [],
    time: "",
    instructions: "",
  });
  //   function updateForm(value) {
  //     return setForm((prev) => {
  //       return { ...prev, ...value };
  //     });
  //   }

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

  async function submit(e) {
    e.preventDefault();
    const newRecipe = { ...form };
    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({
      name: "",
      servings: "",
      ingredients: createIngredientList(ingredients),
      time: "",
      instructions: "",
    });
  }

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
          id="standard-textarea"
          label="Recipe Name"
          placeholder="Chicken Noodle Soup"
          variant="standard"
          //   onChange={(e) => updateForm({ name: e.target.value })}
        />
        <TextField
          required
          id="standard-textarea"
          label="Servings"
          placeholder="6"
          variant="standard"
          //   onChange={(e) => updateForm({ servings: e.target.value })}
        />
        <TextField
          required
          id="standard-textarea"
          label="Time"
          placeholder="40 minutes"
          variant="standard"
          //   onChange={(e) => updateForm({ time: e.target.value })}
        />
      </div>
      <div>
        <TextField
          required
          id="standard-textarea"
          label="Ingredient List"
          placeholder="1 tbsp butter, 0.5 cup onion, 1/2 cup celery, 4x14.5oz can chicken broth, 1x14.5oz can vegetable broth, 0.5 lb chicken breast, 1.5 cups egg noodles, 1 cup carrots, 0.5 tsp basil, 0.5 tsp oregano"
          multiline
          variant="standard"
          //   onChange={(e) => updateForm({ ingredients: e.target.value })}
        />
      </div>
      <div>
        <TextField
          required
          id="standard-textarea"
          label="Instructions"
          placeholder="Melt butter in a large pot over medium heat. Add onion and celery and cook until just tender, about 5 minutes. Add chicken broth, vegetable broth, chicken, egg noodles, carrots, basil, oregano, salt, and pepper. Stir to combine and bring to a boil. Reduce heat and simmer for 20 minutes."
          multiline
          variant="standard"
          //   onChange={(e) => updateForm({ instructions: e.target.value })}
        />
      </div>
      <div>
        <Button variant="contained" disableElevation onClick={submit()}>
          Submit Recipe
        </Button>
      </div>
    </Box>
  );
}
