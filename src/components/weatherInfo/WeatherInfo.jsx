import { formatDate, formatTime, toUpperCaseWords } from "../../helpers/helper";
import { getIcon } from "../../helpers/getIcon";
import './WeatherInfo.css'

export function WeatherInfo({currWeatherInfo, cityName, units}) {
  return (
    <div className="weather-info">
      <div className="weather-info__description">
        {toUpperCaseWords(currWeatherInfo.weather[0].description)}
      </div>
      <div className="weather-info__city">{toUpperCaseWords(cityName)}</div>
      <div className="weather-info__date">{formatDate(currWeatherInfo.dt)}</div>
      <div className="weather-info__date">{formatTime(currWeatherInfo.dt)}</div>
      <div className="weather-info__temperature">
        {Math.round(currWeatherInfo.temp)} {units === 'metric' ? '°C' : '°F'}
      </div>
      <div className="weather-info__icon">
        {getIcon(currWeatherInfo.weather[0].icon)}
      </div>
    </div>
  );
}
