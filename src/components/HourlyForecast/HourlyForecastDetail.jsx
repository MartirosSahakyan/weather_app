import { getIcon } from "../../helpers/getIcon";
import { formatHourAmPm } from "../../helpers/helper";
import "./HourlyForecastDetail.css";

export function HourlyForecastDetail({ hourlyWeather, units }) {
  return (
    <div className="forecast-hourly" id="current-hour-plus-1">
      <div className="forecast-hourly__day">
        {formatHourAmPm(hourlyWeather.dt)}
      </div>
      <div className="forecast-hourly__temperature">
        <div className="forecast-hourly__temperature-high">
          {Math.round(hourlyWeather.temp)} {units === "metric" ? "°C" : "°F"}
        </div>
      </div>
      <div className="forecast-hourly__icon">
        {getIcon(hourlyWeather.weather[0].icon)}
      </div>
    </div>
  );
}
