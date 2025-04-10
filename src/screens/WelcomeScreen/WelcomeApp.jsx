import { FooterApp } from "../../footer/FooterApp";
import "./WelcomeApp.css";

import polarBearImage from "../../assets/polar-bear.png";
export const WelcomeApp = () => {
  return (
    <div className="welcomeApp">
      <img src={polarBearImage} alt="polar-bear" className="polarBear" />
      <h1 id="welcomeTitle">Welcome to Weather Wizards</h1>
      <h2 id="subtitle">
        Are you tired of not picking the right clothes for the day?
      </h2>
      <p className="description">
        We don't know about styling, but we could help you by telling you if you
        need a coat or not!
      </p>
      <p className="description">
        Just type the name of the place where you live, we'll take care of the
        rest ☺️
      </p>
      <button className="weatherCheck">Check the weather</button>
      <FooterApp></FooterApp>

      
    </div>
  );
};
