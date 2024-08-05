import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [location, setLocation] = useState('London'); // Default location
  const [weatherData, setWeatherData] = useState(null); // State to store weather data
  
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=cb490e9a1d93f41acbabadabc1de7293`

  async function getData() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data); 
      console.log(data)
    } catch (err) {
      console.log(err.message); 
    }
  }

  function handleSearch() {
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  function handleChange(e) {
    setLocation(e.target.value);
  }

  return (
    <div className="App">
      <div className='search-bar'>
        <input
          className='search'
          type="text"
          value={location}
          onChange={handleChange}
        />
        <button
          type='submit'
          className='search-button'
          onClick={handleSearch}
        >
          Go
        </button>
      </div>
      <div className='card'>
        {weatherData ? (
          <>
            <div className='top'>
              <div className='location'>
                <p>{weatherData.name}</p>
              </div>
              <div className='temperature'>
                <h2>{(weatherData.main.temp - 273.15).toFixed(0)}°C</h2>
              </div>
              <div className='description'>
                <p>{weatherData.weather[0].description}</p>
              </div>
            </div>
            <div className='bottom'>
              <div className='feels'>
                <p>Feels like</p>
                <p>{(weatherData.main.feels_like - 273.15).toFixed(1)}°C</p>
              </div>
              <div className='humidity'>
                <p>Humidity</p>
                <p>{weatherData.main.humidity}%</p>
              </div>
              <div className='wind'>
                <p>Wind Speed m/s</p>
                <p>{weatherData.wind.speed}</p>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
