import "./DailyForecast.css";
import { DailyWeatherDetail } from "./DailyWeatherDetail";

export function DailyForecast({ dailyWeatherInfo, units }) {
  return (
    <div className="forecast-daily-container">
      {dailyWeatherInfo.map((dailyWeather, index) => (
        <DailyWeatherDetail
          key={index}
          units={units}
          dailyWeather={dailyWeather}
        />
      ))}
    </div>
  );
}
