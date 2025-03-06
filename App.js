import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [inputCity, setInputCity] = useState('');
  const apiKey = "bd5e378503939ddaee76f12ad7a97608";

  useEffect(() => {
    if (city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(url)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the weather data!", error);
        });
    }
  }, [city, apiKey]);

  const handleSearch = () => {
    setCity(inputCity);
  };

  const getBackgroundImage = (weather) => {
    if (!weather) return '';
    const condition = weather.weather[0].main.toLowerCase();
    switch (condition) {
      case 'clear':
        return 'url(/images/clear.jpg)';
      case 'clouds':
        return 'url(/images/cloud.jpg)';
      case 'rain':
        return 'url(/images/rain.jpg)';
      case 'snow':
        return 'url(/images/snow.jpg)';
      case 'thunderstorm':
        return 'url(/images/thunder.jpg)';
      case 'sunny':
        return 'url(/images/sunny.jpg)';
      default:
        return 'url(/images/default.jpg)';
    }
  };

  return (
    <div className="App" style={{ backgroundImage: getBackgroundImage(weather) }}>
      <input 
        type="text" 
        value={inputCity} 
        onChange={(e) => setInputCity(e.target.value)} 
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {weather ? (
        <div className="weather-container">
          <h1>{weather.name}</h1>
          <p>{weather.weather[0].description}</p>
          <p>{Math.round(weather.main.temp)}°C</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <footer>
        <p>Weather App by Vel Selvi</p>
      </footer>
    </div>
  );
}

export default App;
