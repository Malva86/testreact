import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [load, setLoad] = useState(false);
  const [temp, setTemp] = useState(null);
  const [desc, setDesc] = useState(null);
  const [humi, setHumi] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  function displayWeather(response) {
    setLoad(true);
    setTemp(response.data.main.temp);
    setDesc(response.data.weather[0].description);
    setHumi(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);
    console.log(response.data.main.temp);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f4694dab77f16eded26a08442f7ba9ab&units=metric`;
    console.log(url);
    axios.get(url).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }
  if (load) {
    return (
      <div>
        <h2 className="Temp">
          Temperature in {city} is {Math.round(temp)}°C
        </h2>

        <div className="container">
          <div className="icon">
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="Icon"
            />
          </div>
          <div className="desc">
            <h2>Description: {desc}</h2>
            <h2>Humidity: {humi} %</h2>
            <h2>Wind: {Math.round(wind)} km/h</h2>
          </div>
        </div>
        <h2>Click 🔄 to type a City😊</h2>

        <h3 className="git">
          Open-source code at{" "}
          <a href="https://github.com/Malva86/Weather--react">GitHub</a> and
          host at <a href="">Netlify</a>
        </h3>
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Type a city..."
          onChange={updateCity}
        />
        <input type="submit" value="Search" />
      </form>
    );
  }
}
