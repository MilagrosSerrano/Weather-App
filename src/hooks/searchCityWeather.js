import { fetchData } from "./fetchData";


export const searchCityWeather = (city) =>{
    const lon = city.longitude;
    const lat = city.latitude;
    console.log(city);
    console.log(lat);
    console.log(lon);
    const urlBase2 =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&current=precipitation&current=is_day&current=weather_code&current=wind_speed_10m&current=relative_humidity_2m`;
    return fetchData(urlBase2,{});
}