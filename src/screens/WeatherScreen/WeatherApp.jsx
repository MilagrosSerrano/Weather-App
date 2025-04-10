import "./WeatherApp.css";

export const WeatherApp = () => {
  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form id="weather-form">
        <input type="text" name="city" id="city" placeholder="Type your city name" />
        <button type="submit" id="search">Search</button>
      </form>
    </div>
  );
};
