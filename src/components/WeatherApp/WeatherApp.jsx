import React from "react";
import { DETAIL_TYPES, UNITS } from "../../helpers/constants";
import {
  getWeatherByCityName,
  getWeatherByCoords,
} from "../../service/service";
import { DailyForecast } from "../DailyForecast/DailyForecast";
import { HourlyForecast } from "../HourlyForecast/HourlyForecast";
import { SearchBox } from "../SearchBox/SearchBox";
import { WeatherDetails } from "../weatherDetails/WeatherDetails";
import { WeatherInfo } from "../weatherInfo/WeatherInfo";
import "./WeatherApp.css";

let cityName = "London";
// console.log(window.navigator.geolocation);
class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      units: UNITS.CELSIUS,
      error: {
        cityNameError: false,
        coordsError: false,
      },
      loading: false,
      forecastDetail: DETAIL_TYPES.DAILY,
    };
  }

  getWeatherData(cityName, units) {
    this.setState({ loading: true });
    getWeatherByCityName(cityName)
      .then(({ coord }) => {
        return getWeatherByCoords(coord, units)
          .then((res) => {
            this.setState({
              data: res,
              error: {
                cityNameError: false,
                coordsError: false,
              },
              loading: false,
              units,
            });
            return res;
          })
          .catch((e) => {
            this.setState({ error: { coordsError: true }, loading: false });
          });
      })
      .catch((e) => {
        this.setState({ error: { cityNameError: true }, loading: false });
      });
  }

  componentDidMount() {
    this.getWeatherData(cityName, this.state.units);
  }

  handlerInput = ({ target: { value } }) => {
    cityName = value;
  };

  handlerKeyDown = (evt) => {
    if (evt.key === "Enter") {
      this.getWeatherData(cityName, this.state.units);
    }
  };

  handlerSearchButton = () => {
    this.getWeatherData(cityName, this.state.units);
  };

  handlerChangeUnits = () => {
    const units =
      this.state.units === UNITS.CELSIUS ? UNITS.FAHRENHEIT : UNITS.CELSIUS;
    this.getWeatherData(cityName, units);
  };

  handleDailyButtonsClick = () => {
    this.setState({ forecastDetail: DETAIL_TYPES.DAILY });
  };
  handleHourlyButtonsClick = () => {
    this.setState({ forecastDetail: DETAIL_TYPES.HOURLY });
  };

  render() {
    if (!this.state.data) return <div className="body"></div>;

    let {
      data: { current },
      data: { daily },
      data: { hourly },
      error,
      units,
      loading,
      forecastDetail,
    } = this.state;

    return (
      <div className="body">
        <div className="main">
          <WeatherInfo
            currWeatherInfo={current}
            cityName={cityName}
            units={units}
          />
          <SearchBox
            handlerInput={this.handlerInput}
            handlerKeyDown={this.handlerKeyDown}
            handlerSearchButton={this.handlerSearchButton}
            units={units}
            handlerChangeUnits={this.handlerChangeUnits}
            error={error.cityNameError}
            loading={loading}
          />
          <WeatherDetails currWeatherInfo={current} units={units} />
        </div>

        <div className="forecast">
          <div className="change-forecast">
            <div
              onClick={this.handleDailyButtonsClick}
              className={
                forecastDetail === DETAIL_TYPES.DAILY
                  ? "daily-btn forecast-selected"
                  : "daily-btn"
              }
            >
              Daily
            </div>
            <div
              onClick={this.handleHourlyButtonsClick}
              className={
                forecastDetail === DETAIL_TYPES.HOURLY
                  ? "hourly-btn forecast-selected"
                  : "hourly-btn"
              }
            >
              Hourly
            </div>
           {
             forecastDetail === DETAIL_TYPES.HOURLY && 
             <div className="change-hours">
             <div className="change-hours__left">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 version="1.1"
                 viewBox="8.02 6 7.41 12"
                 fill="#f5f5f5"
               >
                 <title>arrow_left</title>
                 <path d="M15.422 16.594l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z" />
               </svg>
             </div>
             <div className="dot dot1 dot-selected" data-dot="1"></div>
             <div className="dot dot2" data-dot="2"></div>
             <div className="dot dot3" data-dot="3"></div>
             <div className="change-hours__right">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 version="1.1"
                 viewBox="8.58 6 7.41 12"
                 fill="#f5f5f5"
               >
                 <title>arrow_right</title>
                 <path d="M8.578 16.594l4.594-4.594-4.594-4.594 1.406-1.406 6 6-6 6z" />
               </svg>
             </div>
           </div>
           }
          </div>
          {forecastDetail === DETAIL_TYPES.DAILY ? (
            <DailyForecast dailyWeatherInfo={daily} units={units} />
          ) : (
            <HourlyForecast  hourlyWeatherInfo={hourly} units={units} />
          )}
        </div>
      </div>
    );
  }
}
export default WeatherApp;
