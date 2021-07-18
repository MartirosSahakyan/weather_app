import { getIcon } from "../../helpers/getIcon";
import { formatWeekDay } from "../../helpers/helper";
import "./DailyWeatherDetail.css";

export function DailyWeatherDetail({ dailyWeather, units }) {
  return (
    <div className="forecast-daily">
      <div className="forecast-daily__day">
        {formatWeekDay(dailyWeather.dt)}
      </div>
      <div className="forecast-daily__temperature">
        <div className="forecast-daily__temperature-high">
          {Math.round(dailyWeather.temp.max)} {units === "metric" ? "°C" : "°F"}
        </div>
        <div className="forecast-daily__temperature-low">
          {Math.round(dailyWeather.temp.min)} {units === "metric" ? "°C" : "°F"}
        </div>
      </div>
      <div className="forecast-daily__icon">
        {getIcon(dailyWeather.weather[0].icon)}
      </div>
    </div>
  );
}
