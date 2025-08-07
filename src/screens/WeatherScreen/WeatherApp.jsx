import { useEffect, useState } from "react";
import "./WeatherApp.css";
import { fetchData } from "../../hooks/fetchData";
import { searchCityWeather } from "../../hooks/searchCityWeather";
import descriptions from "../../assets/descriptions.json";
import { FooterApp } from "../../footer/FooterApp";
import backBlue from "../../assets/back-blue.png";
import { useNavigate } from "react-router-dom";

export const WeatherApp = () => {
  const [inputText, setInputText] = useState("");
  const [inputTimer, setInputTimer] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [weatherResults, setWeatherResults] = useState([]);
  const [city, setCity] = useState("");
  const [weatherDescription, setWeatherDescription] = useState([])

  const urlBase = "https://api.api-ninjas.com/v1/geocoding";
  const API_KEY = "tsKF7DjQV4uadAc5EcZDgQ==H5Gy4L0BcBPVsEiZ";
  const headers = new Headers({
    "X-Api-Key": `${API_KEY}`,
  });

  useEffect(() => {
    if (weatherResults.length !== 0) {
      const weatherCode = weatherResults.current.weather_code;
      const isDay = weatherResults.current.is_day == 0 ? "night" : "day";
      setWeatherDescription(descriptions[weatherCode]?.[isDay]);
    }
  }, [weatherResults]);

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/");
  }

  if ("geolocation" in navigator){
    console.log(navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
      },
      (error) => {
        console.error("Error getting the location: ", error.message)
      }
    ));
  }else{
    console.log("Geolocation not available");
  }

  const selectedCity = async (event) => {
    // Extract the city name from the text content that contains the city and country
    const cityName = event.target.textContent.split(",")[0].trim();
    const cityCountry = event.target.id;

    const picked = searchResults.filter((item) => item.name === cityName);

    if (picked.length > 0) {
      const selected = picked.filter((item) => item.country === cityCountry);

      if (selected.length > 0) {
        const citySelected = selected[0]; // Pass the first object, not the array
        setCity(citySelected.name);
        try {
          const data = await searchCityWeather(citySelected);
          setWeatherResults(data);
          console.log(data)
          document.getElementById("results").style.display = "none";
        } catch (error) {
          console.error("Error fetching data:", error);
          setWeatherResults([]);
        }
        return citySelected;
      } else {
        console.error("No matching city found in the selected array");
      }
    } else {
      console.error("No matching city found in the picked array");
    }
  };

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
    <div
      className={`searchBar ${
        weatherResults.length == 0 ? "searchBarCenter" : "searchBarTop"
      }`}
    >
      <button id="goBackBtn" onClick={handleClick}> <img src={backBlue} alt="back-btn" id="arrowBtn"/></button>
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
        <button id="search">
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
                {item.name}, {item.country}
              </button>
            ))
          ) : (
            <div className="noResults">No results found</div>
          )}
        </div>
      )}
      {weatherResults.length != 0 && (
        <div className="weatherCard">
          <h3 id="cityName">{city}</h3>
             {weatherDescription && (
      <>
        {weatherDescription.image && (<img
          id="weatherImage"
          src={weatherDescription.image}
          alt={weatherDescription.description || "No weather condition available"}
        />)}
        <h3 id="cardClimate">
          {weatherDescription.description || "No description available"}
        </h3>
      </>
    )}
          <div id="conditions">
            <div id="wind">
              <p>Wind</p>
              <h3>{weatherResults.current.wind_speed_10m} km/h</h3>
            </div>
            <div id="temperature">
              <p>Temperature</p>
              <h3>{weatherResults.current.temperature_2m}°C</h3>
            </div>
            <div id="humidity">
              <p>Humidity</p>
              <h3>{weatherResults.current.relative_humidity_2m}%</h3>
            </div>
            <div id="humidity">
              <p>Precipitation</p>
              <h3>{weatherResults.current.precipitation} mm</h3>
            </div>
          </div>
        </div>
      )}
      <FooterApp></FooterApp>
    </div>
  );
};
