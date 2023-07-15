import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeList from "./components/RecipeList";

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
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
