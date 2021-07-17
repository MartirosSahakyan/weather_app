import { formatDate, formatTime, toUpperCaseWords } from "../../helpers/helper";
import { getIcon } from "../../helpers/getIcon";
import './WeatherInfo.css'

export function WeatherInfo({current, cityName}) {
  return (
    <div className="weather-info">
      <div className="weather-info__description">
        {toUpperCaseWords(current.weather[0].description)}
      </div>
      <div className="weather-info__city">{toUpperCaseWords(cityName)}</div>
      <div className="weather-info__date">{formatDate(current.dt)}</div>
      <div className="weather-info__date">{formatTime(current.dt)}</div>
      <div className="weather-info__temperature">
        {Math.round(current.temp)} °C
      </div>
      <div className="weather-info__icon">
        {getIcon(current.weather[0].icon)}
      </div>
    </div>
  );
}
