import React from "react";
import "./WeatherApp.css";
import { DETAIL_TYPES, UNITS } from "../../constants/constants";
import {
  getWeatherByCityName,
  getWeatherByCoords,
} from "../../service/service";
import { sliceHourlyWeather } from "../../helpers/utils";
import { DailyForecast } from "../DailyForecast/DailyForecast";
import { HourlyForecast } from "../HourlyForecast/HourlyForecast";
import { SearchBox } from "../SearchBox/SearchBox";
import { WeatherDetails } from "../weatherDetails/WeatherDetails";
import { WeatherInfo } from "../weatherInfo/WeatherInfo";
import { Pagination } from "../Pagination/Pagination";
import { DetailButton } from "../Buttons/DetailButton/DetailButton";

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      cityName: "",
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
    // get user geolocation coordinates and display forecast by default
    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userCityCoord = {
          lon: Number(pos.coords.longitude.toFixed(4)),
          lat: Number(pos.coords.latitude.toFixed(4)),
        };
        getWeatherByCoords(userCityCoord, this.state.units)
          .then((res) => {
            this.setState({
              data: res,
            });
            return res;
          })
          .catch(() => {
            this.setState({ cityName: "London" });
          });
      },
      // if user turn off geolocation in browser
      () => {
        this.setState({ cityName: "London" });
      }
    );
  }

  handlerInput = ({ target: { value } }) => {
    this.setState({ cityName: value });
  };

  handlerKeyDown = (evt) => {
    if (evt.key === "Enter") {
      this.getWeatherData(this.state.cityName, this.state.units);
    }
  };

  handlerSearchButton = () => {
    this.getWeatherData(this.state.cityName, this.state.units);
  };

  handlerChangeUnits = () => {
    const units =
      this.state.units === UNITS.CELSIUS ? UNITS.FAHRENHEIT : UNITS.CELSIUS;
    this.getWeatherData(this.state.cityName, units);
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
            cityName={this.state.cityName}
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
            <DetailButton
              handleClick={this.handleDailyButtonClick}
              text={DETAIL_TYPES.DAILY}
              detailType={forecastDetail}
            />
            <DetailButton
              handleClick={this.handleHourlyButtonClick}
              text={DETAIL_TYPES.HOURLY}
              detailType={forecastDetail}
            />

            {forecastDetail === DETAIL_TYPES.HOURLY && (
              <Pagination
                handleLeftClick={this.handleLeftClick}
                handleRightClick={this.handleRightClick}
                handleDotsClick={this.handleDotsClick}
                pages={pages}
              />
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
