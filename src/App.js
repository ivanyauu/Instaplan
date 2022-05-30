import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./navigation.js";
import Profile from "./profile.js";
import Home from "./home.js";
import SearchPage from "./searchPage.js";

function App() {
  return (
    <div className="app">
      <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/searchPage" element={<SearchPage />} />
      </Routes>
      </Router>
    </div>
  )
}

export default App;

