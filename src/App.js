import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./navigation.js";
import Profile from "./profile.js";
import Home from "./home.js";

function App() {
  return (
    <div className="app">
      <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </Router>
    </div>
  )
}

export default App;

