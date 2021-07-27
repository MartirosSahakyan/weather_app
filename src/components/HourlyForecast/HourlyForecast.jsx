import { formatHourAmPm, formatTimeAmPm } from "../../helpers/helper";
import "./HourlyForecast.css";
import { HourlyForecastDetail } from "./HourlyForecastDetail";

export function HourlyForecast({ hourlyWeatherInfo, units }) {
  // console.log(hourlyWeatherInfo);
  const weather24Hours = hourlyWeatherInfo.slice(0, 24);
  console.log(weather24Hours);
  
  
  return (
    <div className="forecast-hourly-outer-container">
      <div className="forecast-hourly-container">
        {weather24Hours.map((hourlyWeather, index) => {
          return (
            <HourlyForecastDetail
              hourlyWeather={hourlyWeather}
              key={index}
              units={units}
            />
          );
        })}
      </div>
    </div>
  );
}
