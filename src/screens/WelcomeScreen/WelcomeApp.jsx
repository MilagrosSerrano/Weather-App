import { FooterApp } from "../../footer/FooterApp";
import "./WelcomeApp.css";
import logo from "../../assets/weather-wizards-logo-full.png";
import logoOutline from "../../assets/dotted-circle.png";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useEffect } from "react";

export const WelcomeApp = () => {
  useEffect(() => {
    window.addEventListener('DOM Content Loaded', () => {
    })
    gsap.to("#logoOutline", { rotation: 360, repeat:-1, repeatDelay:0, duration:40, ease:"none"});
      
  }, [])
  
  
  const navigate = useNavigate();

  const openWeather = () => {
    navigate("weather");
  };
  return (
    <main className="welcomeApp">
      <section className="fullLogo">
        <img src={logo} alt="weather-wizards-logo" id="logo" />
        <img src={logoOutline} alt="logoOutline" id="logoOutline" />
      </section>
      <section className="mainDescription">
        <h1 id="welcomeTitle">Welcome to Weather Wizards</h1>
        <h2 id="subtitle">
          Are you tired of not picking the right clothes for the day?
        </h2>
        <p className="description">
          We don't know about styling, but we could help you by telling you if
          you need a coat or not!
        </p>
        <p className="description">
          Just type the name of the place where you live, we'll take care of the
          rest ☺️
        </p>
        <button className="weatherCheck" onClick={openWeather}>
          Check the weather
        </button>
      </section>
      <FooterApp></FooterApp>
    </main>
  );
};
