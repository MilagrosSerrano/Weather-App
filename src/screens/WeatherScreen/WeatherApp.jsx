import { useState } from "react";
import "./WeatherApp.css";

export const WeatherApp = () => {
  const [inputText, setInputText] = useState("");
  const [inputTimer, setInputTimer] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) =>{
    setInputText(event.target.value);

    clearTimeout(inputTimer);

    let timeout = setTimeout(() =>{
      try {
        fetch(`http://suggestqueries.google.com/complete/search?client=chrome&q=${e.target.value}&callback=callback`)
        console.log(res)
        .then((res)=>{
          setSearchResults(res.data);
          console.log(res.data);
        })
      } catch (error) {
        throw new Error("Something went wrong, couldn't get the results")
      }
    }, 300);
    setInputTimer(timeout);
  }

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form id="weather-form">
        <input type="text" name="city" id="city" placeholder="Type your city name" value={inputText} onChange={handleInputChange}/>
        <button type="submit" id="search">Search</button>
        <div className="results">
          <ul>
            {searchResults.map((searchResult)=>{<li>{searchResult}</li>})}
          </ul>
        </div>
      </form>
    </div>
  );
};
