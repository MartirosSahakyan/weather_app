import PropTypes from "prop-types";
import "./WeatherDetails.css";
import { ReactComponent as Wind } from "../../assets/SVG/wind.svg";
import { ReactComponent as Humidity } from "../../assets/SVG/humidity.svg";
import { ReactComponent as FeelLikes } from "../../assets/SVG/feelLikes.svg";

export function WeatherDetails({ currWeatherInfo, units }) {
  return (
    <div className="weather-details-container">
      <div className="weather-details">
        <div className="weather-details__icon">
          <FeelLikes />
        </div>
        <div className="weather-details__info">
          <div className="weather-details__label">Feels Like</div>
          <div className="weather-details__data" id="feels-like">
            {Math.round(currWeatherInfo.feels_like)}{" "}
            {units === "metric" ? "°C" : "°F"}
          </div>
        </div>
      </div>
      <div className="weather-details">
        <div className="weather-details__icon">
           <Humidity />
        </div>
        <div className="weather-details__info">
          <div className="weather-details__label">Humidity</div>
          <div className="weather-details__data" id="humidity">
            {currWeatherInfo.humidity} %
          </div>
        </div>
      </div>
      <div className="weather-details">
        <div className="weather-details__icon">
        <Wind />
        </div>
        <div className="weather-details__info">
          <div className="weather-details__label">Wind Speed</div>
          <div className="weather-details__data" id="wind-speed">
            {currWeatherInfo.wind_speed} {units === "metric" ? "km/h" : "mph"}
          </div>
        </div>
      </div>
    </div>
  );
}

WeatherDetails.propTypes = {
  units: PropTypes.string.isRequired,
  currWeatherInfo: PropTypes.object.isRequired,
};
