import { useState } from 'react';
import axios from 'axios';
import cloud from "../../assets/cloud.png";
import rain from "../../assets/rain.png";
import drop from "../../assets/drop.png";

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = '128a27b86190a4230efb028ef59ede8c';

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const handleOk = async () => {
        if (!city) return;
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeatherData(response.data);
            setCity('');
        } catch (error) {
            console.error('Error fetching weather data:', error);
            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert('Could not fetch weather data. Please check your connection.');
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-xl mt-10 text-white">
            <input
                className="w-full p-3 mb-4 text-gray-900 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={city}
                onChange={handleChange}
                placeholder="Enter city name"
            />
            <button 
                className="w-full py-3 mb-6 font-semibold text-blue-500 bg-white rounded-md hover:bg-blue-100 transition duration-200"
                onClick={handleOk}
            >
                Get Weather
            </button>

            <div className="weather-info mt-8">
                {weatherData ? (
                    <>
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold">{weatherData.name}</h2>
                            <p className="text-xl capitalize mt-2">{weatherData.weather[0].description}</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-around space-y-6 md:space-y-0 mb-6">
                            <div className="text-center">
                                <h1 className="text-6xl font-bold mb-2">{Math.round(weatherData.main.temp)}°C</h1>
                                <p className="text-lg">Feels like {Math.round(weatherData.main.feels_like)}°C</p>
                            </div>

                            <div className="flex space-x-8 text-center">
                                <div>
                                    <img src={cloud} alt="Clouds" className="w-10 h-10 mx-auto mb-1" />
                                    <p>{weatherData.clouds.all}% Clouds</p>
                                </div>
                                <div>
                                    <img src={rain} alt="Rain" className="w-10 h-10 mx-auto mb-1" />
                                    <p>{weatherData.rain ? weatherData.rain['1h'] : 0} mm Rain</p>
                                </div>
                                <div>
                                    <img src={drop} alt="Humidity" className="w-10 h-10 mx-auto mb-1" />
                                    <p>{weatherData.main.humidity}% Humidity</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center text-sm text-blue-100 bg-blue-500 rounded-lg p-4">
                            <p>Longitude: {weatherData.coord.lon}</p>
                            <p>Latitude: {weatherData.coord.lat}</p>
                            <p>Pressure: {weatherData.main.pressure} hPa</p>
                            <p>Min Temp: {Math.round(weatherData.main.temp_min)}°C</p>
                            <p>Max Temp: {Math.round(weatherData.main.temp_max)}°C</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-blue-100">Please enter a city to get weather data.</p>
                )}
            </div>
        </div>
    );
}

export default Weather;
