import { useState } from "react";
import "./WeatherApp.css";
import { fetchData } from "../../hooks/fetchData";
import { searchCityWeather } from "../../hooks/searchCityWeather";

export const WeatherApp = () => {
  const [inputText, setInputText] = useState("");
  const [inputTimer, setInputTimer] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [weatherResults, setWeatherResults] = useState([]);
  const [city, setCity] = useState("");

  const urlBase = "https://api.api-ninjas.com/v1/geocoding";
  const API_KEY = "tsKF7DjQV4uadAc5EcZDgQ==H5Gy4L0BcBPVsEiZ";
  const headers = new Headers({
    "X-Api-Key": `${API_KEY}`,
  });

  
  const selectedCity = async (event) => {
    console.log(event.target.textContent);
    console.log(searchResults);
    const cityCountry = event.target.id;
    console.log(cityCountry);
    const picked = searchResults.filter(
      (item) => item.name == event.target.textContent
    );
    console.log(picked);
    if (picked.length >= 0) {
      const selected = picked.filter((item) => item.country == cityCountry);
      const citySelected = selected[0]; // Pass the first object, not the array
      setCity(citySelected.name);
      try {
        const data = await searchCityWeather(citySelected);
        console.log(data);
        setWeatherResults(data);
        document.getElementById("results").style.display = "none";
      } catch (error) {
        console.error("Error fetching data: ", error);
        setWeatherResults([]);
      }
      return(citySelected)
    } else {
      console.error("City not found in search results");
    }
  };

  console.log(weatherResults.length == 0)

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    clearTimeout(inputTimer);

    const cityCall = `${urlBase}?city=${event.target.value}`;

    let timeout = setTimeout(async () => {
      if (event.target.value == "") {
        setSearchResults([]);
        return;
      } else {
        try {
          const data = await fetchData(cityCall, headers);
          setSearchResults(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setSearchResults([]);
        }
      }
    }, 300);
    setInputTimer(timeout);
  };

  return (
    <div className={!weatherResults == {} ? "searchBarCenter" : "searchBarTop"}>
      <h1>Weather App</h1>
      <form id="weather-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Type your city name"
          value={inputText}
          onChange={handleInputChange}
        />
        <button type="submit" id="search">
          Search
        </button>
      </form>
      {searchResults.length > 0 && (
        <div id="results">
          {searchResults.length >= 0 ? (
            searchResults.map((item) => (
              <button
                key={item.latitude}
                className="btnResults"
                onClick={selectedCity}
                id={item.country}
              >
                {item.name}
              </button>
            ))
          ) : (
            <div className="noResults">No results found</div>
          )}
        </div>
      )}
      {weatherResults.length != 0 &&  (
        //pensar forma de mover el search bar para arriba cuando se genere el card con la info de weather (clases ternarias capaz)
        <div className="weatherCard">
          <h3 id="cityName">{city}</h3>
          <img/>
          <h1 id="cardClimate"></h1>
          <div id="conditions">
            <div id="wind">
              <p>Wind</p>
              <h2>{weatherResults.current.wind_speed_10m} km/h</h2>
            </div>
            <div id="temperature">
              <p>Temperature</p>
              <h2>{weatherResults.current.temperature_2m}°C</h2>
            </div>
            <div id="humidity">
              <p>Humidity</p>
              <h2>{weatherResults.current.relative_humidity_2m}%</h2>
            </div>
            <div id="precipitation">
              <p>Precipitation</p>
              <h2>{weatherResults.current.precipitation} mm</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
