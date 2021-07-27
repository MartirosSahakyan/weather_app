import './HourlyForecast.css'
import { HourlyForecastDetail } from './HourlyForecastDetail'

export function HourlyForecast() {
  return (
    <div className="forecast-hourly-outer-container">
      <div className="forecast-hourly-container">
        <HourlyForecastDetail />
      </div>
    </div>
  );
}
