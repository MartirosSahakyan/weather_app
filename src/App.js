import React from "react";
import "./App.css";
import { DailyForecast } from "./components/DailyForecast/DailyForecast";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { WeatherDetails } from "./components/weatherDetails/WeatherDetails";
import { WeatherInfo } from "./components/weatherInfo/WeatherInfo";
import { API_KEY, API_URL } from "./helpers/constants";
import { handleResponse } from "./helpers/helper";

let cityName = "London";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      units: "metric",
      error: false,
    };
  }
  componentDidMount() {
    fetch(`${API_URL}weather?q=${cityName}&appid=${API_KEY}`)
      .then((response) => response.json())
      .then(({ coord: { lat, lon } }) => {
        return fetch(
          `${API_URL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${this.state.units}&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({ data: res });
          });
      });
  }

  handlerInput = ({ target: { value } }) => {
    cityName = value;
  };
  handlerKeyDown = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${API_URL}weather?q=${cityName}&appid=${API_KEY}`)
        .then(handleResponse)
        .then(({ coord: { lat, lon } }) => {
          return fetch(
            `${API_URL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${this.state.units}&appid=${API_KEY}`
          )
            .then((res) => res.json())
            .then((res) => {
              this.setState({
                data: res,
                error: false,
              });
              return res;
            });
        })
        .catch((e) => {
          this.setState({ error: true });
        });
    }
  };
  handlerSearchButton = () => {
    fetch(`${API_URL}weather?q=${cityName}&appid=${API_KEY}`)
      .then(handleResponse)
      .then(({ coord: { lat, lon } }) => {
        return fetch(
          `${API_URL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${this.state.units}&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              data: res,
              error: false,
            });
            return res;
          })
          .catch((e) => alert("reload page window.location.reload()"));
      })
      .catch((e) => {
        this.setState({ error: true });
      });
  };

  handlerChangeUnits = () => {
    if (this.state.units === "metric") {
      this.setState({ units: "imperial" });
    } else {
      this.setState({ units: "metric" });
    }
    fetch(`${API_URL}weather?q=${cityName}&appid=${API_KEY}`)
      .then((response) => response.json())
      .then(({ coord: { lat, lon } }) => {
        return fetch(
          `${API_URL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=${this.state.units}&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({ data: res });
          });
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
