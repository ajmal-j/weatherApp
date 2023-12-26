import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { weatherUrl, weather_key } from "./utils/api";
import { useState } from "react";
import { Header } from "./components/header/header";
import { Forecast } from "./components/forecast/forecast";
import { Button } from "./components/getCurrentButton/button";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${weatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`
    );
    const forecastFetch = fetch(
      `${weatherUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (responses) => {
        const [currentWeatherResponse, forecastResponse] = await Promise.all(
          responses.map((response) => response.json())
        );

        setCurrentWeather({
          city: searchData.label,
          ...currentWeatherResponse,
        });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleLocationButtonClick = (location) => {
    handleOnSearchChange(location)
  };
  return (
    <div className="container">
      <Header />
      <div className="searchContainer">
        <Search onSearchChange={handleOnSearchChange} />
        <Button onButtonClick={handleLocationButtonClick} />
      </div>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
