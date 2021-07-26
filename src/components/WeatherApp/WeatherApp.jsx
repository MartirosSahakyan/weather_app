import React from "react";
import { UNITS } from "../../helpers/constants";
import { getWeatherByCityName, getWeatherByCoords } from "../../service/service";
import { DailyForecast } from "../DailyForecast/DailyForecast";
import { SearchBox } from "../SearchBox/SearchBox";
import { WeatherDetails } from "../weatherDetails/WeatherDetails";
import { WeatherInfo } from "../weatherInfo/WeatherInfo";
import "./WeatherApp.css";
// import { DailyForecast } from "./components/DailyForecast/DailyForecast";
// import { SearchBox } from "./components/SearchBox/SearchBox";
// import { WeatherDetails } from "./components/weatherDetails/WeatherDetails";
// import { WeatherInfo } from "./components/weatherInfo/WeatherInfo";
// import { getWeatherByCityName, getWeatherByCoords } from "./service/service";
// import { UNITS } from "./helpers/constants";

let cityName = "London";
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
    };
  }

   getWeatherData(cityName,units) {
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
              units
            });
            return res;
          })
          .catch((e) => {
            this.setState({ error: { coordsError: true }, loading: false });
            alert("reload page window.location.reload()");
          });
      })
      .catch((e) => {
        this.setState({ error: { cityNameError: true }, loading: false });
      });
  }

  componentDidMount() {
    this.getWeatherData(cityName, this.state.units)
  }

  handlerInput = ({ target: { value } }) => {
    cityName = value;
  };

  handlerKeyDown = (evt) => {
    if (evt.key === "Enter") {
      this.getWeatherData(cityName, this.state.units)    
    }
  };

  handlerSearchButton = () => {
    this.getWeatherData(cityName, this.state.units)
  };

  handlerChangeUnits = () => {
    const units =
      this.state.units === UNITS.CELSIUS ? UNITS.FAHRENHEIT : UNITS.CELSIUS;
      this.getWeatherData(cityName, units)
  };

  render() {
    if (!this.state.data) return "";

    let {
      data: { current },
      data: { daily },
      error,
      units,
      loading
    } = this.state;
    // console.log(daily);
    // console.log(error);
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
            <div className="daily-btn forecast-selected">Daily</div>
          </div>
          <DailyForecast dailyWeatherInfo={daily} units={units} />
        </div>
      </div>
    );
  }
}
export default WeatherApp;