import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import './WeatherInfo.css';

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "a1480c145f4e409144a2e3e6481f8194";

export default function SearchBox({ InfoUpdate }) {
    const [city, setCity] = useState("");
    const [Err, setErr] = useState(false);

    const fetchWeather = async () => {
        try {
            const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();

            if (response.ok) {
                const result = {
                    city,
                    temp: data.main.temp,
                    tempMin: data.main.temp_min,
                    tempMax: data.main.temp_max,
                    feelsLike: data.main.feels_like,
                    humidity: data.main.humidity,
                    weather: data.weather[0].description,
                };
                setErr(false);
                return result;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setErr(true);
        }
    };

    const handleChange = (event) => {
        setCity(event.target.value);
        if (Err) setErr(false); // Clear error message when user starts typing again
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!city.trim()) {
            setErr(true);
            return;
        }
        const weatherData = await fetchWeather();
        if (weatherData) {
            InfoUpdate(weatherData);
        }
        setCity(""); // Reset the input field after submission
    };

    return (
        <div className='searchBoxContainer'>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="Search City"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                    className='searchbox'
                />
                <Button variant="contained" type="submit" className='button'>Search</Button>
                {Err && <p style={{ color: "red" }}>No such Place Exists</p>}
                <br /><br />
            </form>
        </div>
    );
}
