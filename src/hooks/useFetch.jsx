import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = () => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4c9ebd16d5e74bec94a4f53d41c90715`
        )
        .then((res) => {
          setWeather({
            city: res.data.name,
            country: res.data.sys.country,
            temperature: res.data.main.temp - 273.15,
            description: res.data.weather[0].description,
            wind: res.data.wind.speed,
            clouds: res.data.clouds.all,
            pressure: res.data.main.pressure,
            icon: res.data.weather[0].icon,
          });
          setIsLoading(false);
        });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  console.log(weather);
  return { weather, isLoading };
};

export default useFetch;