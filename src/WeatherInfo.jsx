import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import './WeatherInfo.css';

export default function WeatherInfo({ info }) {
  const Cold_Image = "https://hips.hearstapps.com/hmg-prod/images/cold-quotes-1575930075.jpg";
  const Hot_Image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7iUFI0WEZv9EOO1GFWsBFacIEX6y1Fbo_cw&s";
  const Rain_Image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBV_6k_hHLIXAfjHpkTd8jClh3GW9kH_ZluA&s";
  const Raining = "https://i.pinimg.com/736x/e9/39/8a/e9398ad8965914b9b27744917e61df54.jpg";
  const Sunny = "https://img.freepik.com/premium-vector/beautiful-landscape-background_32582-527.jpg";
  const Snow = "https://media.istockphoto.com/id/1355039197/vector/winter-landscape-with-snow-covered-trees.jpg?s=612x612&w=0&k=20&c=EAWlpYpwN3amAkjE5psAqGHUkra8t7X3MZuSmw6LzsE=";

  useEffect(() => {
    let backgroundImage;

    if (info.humidity > 80) {
      backgroundImage = `url(${Raining})`;
    } else if (info.temp < 15) {
      backgroundImage = `url(${Snow})`;
    } else {
      backgroundImage = `url(${Sunny})`;
    }

    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';

    // Clean up to reset the background image when the component is unmounted or info changes
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, [info]);

  return (
    <div className='card1'>
      <Card className='card'>
        <CardMedia
          sx={{ height: 140 }}
          image={info.humidity > 80 ? Rain_Image : info.temp >= 15 ? Hot_Image : Cold_Image}
          title="Weather image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className='inline_text'>
            <h2>{info.city}</h2>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <p>Temperature: {info.temp}°C</p>
            <p>Feels Like: {info.feelsLike}°C</p>
            <p>Humidity: {info.humidity}%</p>
            <p>Weather: {info.weather}</p>
            <p>Max Temperature: {info.tempMax}°C</p>
            <p>Min Temperature: {info.tempMin}°C</p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
