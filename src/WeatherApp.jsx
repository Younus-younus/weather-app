import { useState } from "react";
import SearchBox from "./SearchBox";
import WeatherInfo from "./WeatherInfo";

export default function WeatherApp() {
    const [info, setInfo] = useState({
        city: "Delhi",
        feelsLike: 33.67,
        humidity: 66,
        weather: "scattered clouds",
        temp: 29.8,
        tempMax: 29.8,
        tempMin: 27.9,
    });

    const handleInfoUpdate = (newInfo) => {
        setInfo(newInfo);
    };

    return (
        <div className="weatherAppContainer">
            <SearchBox InfoUpdate={handleInfoUpdate} />
            <WeatherInfo info={info} />
        </div>
    );
}
