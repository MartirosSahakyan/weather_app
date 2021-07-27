import { formatHourAmPm, formatTimeAmPm } from "../../helpers/helper";
import "./HourlyForecast.css";
import { HourlyForecastDetail } from "./HourlyForecastDetail";

export function HourlyForecast({ hourlyWeathers, units }) {
  
  return (
    <div className="forecast-hourly-outer-container">
      <div className="forecast-hourly-container">
        {hourlyWeathers.map((hourlyWeather, index) => {
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
