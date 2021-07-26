import React from "react";
import "./App.css";
import { DailyForecast } from "./components/DailyForecast/DailyForecast";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { WeatherDetails } from "./components/weatherDetails/WeatherDetails";
import { WeatherInfo } from "./components/weatherInfo/WeatherInfo";
import { getWeatherByCityName, getWeatherByCoords } from "./service/service";
import { UNITS } from "./helpers/constants";

let cityName = "London";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      units: UNITS.CELSIUS,
      error: false,
    };
  }
  componentDidMount() {
    getWeatherByCityName(cityName)
      .then(({ coord }) => {
        return getWeatherByCoords(coord, this.state.units)
          .then((res) => {
            this.setState({
              data: res,
              error: false,
            });
            return res;
          })
          .catch((e) => {
            alert("reload page window.location.reload()");
          });
      })
      .catch((e) => {
        this.setState({ error: true });
      });
  }

  handlerInput = ({ target: { value } }) => {
    cityName = value;
  };

  handlerKeyDown = (evt) => {
    if (evt.key === "Enter") {
      getWeatherByCityName(cityName)
        .then(({ coord }) => {
          return getWeatherByCoords(coord, this.state.units)
            .then((res) => {
              this.setState({
                data: res,
                error: false,
              });
              return res;
            })
            .catch((e) => {
              alert("reload page window.location.reload()");
            });
        })
        .catch((e) => {
          this.setState({ error: true });
        });
    }
  };

  handlerSearchButton = () => {
    getWeatherByCityName(cityName)
      .then(({ coord }) => {
        return getWeatherByCoords(coord, this.state.units)
          .then((res) => {
            this.setState({
              data: res,
              error: false,
            });
            return res;
          })
          .catch((e) => {
            alert("reload page window.location.reload()");
          });
      })
      .catch((e) => {
        this.setState({ error: true });
      });
  };

  handlerChangeUnits = () => {
    if (this.state.units === UNITS.CELSIUS) {
      this.setState({ units: UNITS.FAHRENHEIT });
    } else {
      this.setState({ units: UNITS.CELSIUS });
    }
    getWeatherByCityName(cityName)
      .then(({ coord }) => {
        return getWeatherByCoords(coord, this.state.units)
          .then((res) => {
            this.setState({
              data: res,
              error: false,
            });
            return res;
          })
          .catch((e) => {
            alert("reload page window.location.reload()");
          });
      })
      .catch((e) => {
        this.setState({ error: true });
      });
  };

  render() {
    if (!this.state.data) {
      return "";
    } else {
      let {
        data: { current },
        data: { daily },
        error,
        units,
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
              error={error}
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
}
export default App;
