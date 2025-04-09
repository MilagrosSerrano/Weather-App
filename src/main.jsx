import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WeatherApp } from "./screens/WeatherScreen/WeatherApp";
import { WelcomeApp } from "./screens/WelcomeScreen/WelcomeApp";
import "./index.css";
import { FooterApp } from "./footer/FooterApp";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WelcomeApp>
      <WeatherApp />
      <FooterApp />
    </WelcomeApp>
  </StrictMode>
);
