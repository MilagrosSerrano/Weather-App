import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WeatherApp } from "./screens/WeatherScreen/WeatherApp";
import { WelcomeApp } from "./screens/WelcomeScreen/WelcomeApp";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeApp/>}/>
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="*" element={<Navigate to={"/"}/>}/>
      </Routes>
    </Router>
  </StrictMode>
);
