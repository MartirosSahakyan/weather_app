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
