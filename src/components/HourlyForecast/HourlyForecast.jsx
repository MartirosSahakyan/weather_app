import PropTypes from "prop-types";
import "./HourlyForecast.css";
import { HourlyForecastDetail } from "./HourlyForecastDetail";

export function HourlyForecast({ hourlyWeathers, units }) {
  return (
    <div className="forecast-hourly-outer-container">
      <div className="forecast-hourly-container">
        {hourlyWeathers.map((hourlyWeather) => {
          return (
            <HourlyForecastDetail
              hourlyWeather={hourlyWeather}
              key={hourlyWeather.dt}
              units={units}
            />
          );
        })}
      </div>
    </div>
  );
}

HourlyForecast.propTypes = {
  hourlyWeathers: PropTypes.arrayOf(PropTypes.object).isRequired,
  units: PropTypes.string.isRequired,
};
