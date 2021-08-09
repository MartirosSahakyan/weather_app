const API_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "fd48bdf8a8b87b3c140f17625f4e2d57";

const handleResponse = (response) => {
  return response.json().then((json) => {
    return response.ok ? json : Promise.reject(json);
  });
};

export const getWeatherByCityName = (cityName) => {
  return fetch(`${API_URL}weather?q=${cityName}&appid=${API_KEY}`).then(
    handleResponse
  );
};

export const getWeatherByCoords = (coords, unit) => {
  return fetch(
    `${API_URL}onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,alerts&units=${unit}&appid=${API_KEY}`
  ).then(handleResponse);
};

export const getCityByCoords = (coords) => {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${coords.lon}&limit=2&appid=${API_KEY}`
  ).then(handleResponse);
};
