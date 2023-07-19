import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeList from "./components/RecipeList";
import AddRecipe from "./components/AddRecipe";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <Routes>
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
