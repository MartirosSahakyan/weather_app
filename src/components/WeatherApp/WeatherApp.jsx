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
import cn from "classnames";
import { sliceHourlyWeather } from "../../helpers/helper";

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
      pages: {
        page1: true,
        page2: false,
        page3: false,
      },
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

  handleDailyButtonClick = () => {
    this.setState({ forecastDetail: DETAIL_TYPES.DAILY });
  };
  handleHourlyButtonClick = () => {
    this.setState({ forecastDetail: DETAIL_TYPES.HOURLY });
  };

  handleDotsClick = (id) => {
    this.setState(() => {
      if (id === 1) {
        return {
          pages: {
            page1: true,
            page2: false,
            page3: false,
          },
        };
      }
      if (id === 2) {
        return {
          pages: {
            page1: false,
            page2: true,
            page3: false,
          },
        };
      }
      if (id === 3) {
        return {
          pages: {
            page1: false,
            page2: false,
            page3: true,
          },
        };
      }
    });
  };
  handleRightClick = () => {
    this.setState(({ pages }) => {
      if (pages.page1) {
        return {
          pages: {
            page1: false,
            page2: true,
            page3: false,
          },
        };
      }
      if (pages.page2) {
        return {
          pages: {
            page1: false,
            page2: false,
            page3: true,
          },
        };
      }
      if (pages.page3) {
        return {
          pages: {
            page1: true,
            page2: false,
            page3: false,
          },
        };
      }
    });
  };
  handleLeftClick = () => {
    this.setState(({ pages }) => {
      if (pages.page1) {
        return {
          pages: {
            page1: false,
            page2: false,
            page3: true,
          },
        };
      }
      if (pages.page2) {
        return {
          pages: {
            page1: true,
            page2: false,
            page3: false,
          },
        };
      }
      if (pages.page3) {
        return {
          pages: {
            page1: false,
            page2: true,
            page3: false,
          },
        };
      }
    });
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
      pages,
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
              onClick={this.handleDailyButtonClick}
              className={cn("daily-btn", {
                "forecast-selected": forecastDetail === DETAIL_TYPES.DAILY,
              })}
            >
              Daily
            </div>
            <div
              onClick={this.handleHourlyButtonClick}
              className={cn("hourly-btn", {
                "forecast-selected": forecastDetail === DETAIL_TYPES.HOURLY,
              })}
            >
              Hourly
            </div>
            {forecastDetail === DETAIL_TYPES.HOURLY && (
              <div className="change-hours">
                <div
                  onClick={this.handleLeftClick}
                  className="change-hours__left"
                >
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
                <div
                  onClick={(id) => this.handleDotsClick(1)}
                  className={cn("dot", { "dot-selected": pages.page1 })}
                ></div>
                <div
                  onClick={(id) => this.handleDotsClick(2)}
                  className={cn("dot", { "dot-selected": pages.page2 })}
                ></div>
                <div
                  onClick={(id) => this.handleDotsClick(3)}
                  className={cn("dot", { "dot-selected": pages.page3 })}
                ></div>
                <div
                  onClick={this.handleRightClick}
                  className="change-hours__right"
                >
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
            )}
          </div>
         
          {forecastDetail === DETAIL_TYPES.DAILY ? (
            <DailyForecast dailyWeatherInfo={daily} units={units} />
          ) : (
            <HourlyForecast
              hourlyWeathers={sliceHourlyWeather(pages, hourly)}
              units={units}
            />
          )}
        </div>
      </div>
    );
  }
}
export default WeatherApp;
