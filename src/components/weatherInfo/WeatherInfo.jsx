import { formatDate, formatTime, toUpperCaseWords } from "../../helpers/helper";
import { getIcon } from "../../helpers/getIcon";
import PropTypes from 'prop-types';
import './WeatherInfo.css'
import { UNITS } from "../../helpers/constants";

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
        {Math.round(currWeatherInfo.temp)} {units === UNITS.CELSIUS ? '°C' : '°F'}
      </div>
      <div className="weather-info__icon">
        {getIcon(currWeatherInfo.weather[0].icon)}
      </div>
    </div>
  );
}

// WeatherInfo.propTypes = {
//   currWeatherInfo: PropTypes.object.isRequired,
//   cityName: PropTypes.string.isRequired,
//   units: PropTypes.string.isRequired
// }
