import React from "react";
import "./App.css";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { WeatherDetails } from "./components/weatherDetails/WeatherDetails";
import { WeatherInfo } from "./components/weatherInfo/WeatherInfo";
import { API_KEY, API_URL } from "./helpers/constants";

let cityName = "London";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }
  componentDidMount() {
    fetch(`${API_URL}weather?q=${cityName}&appid=${API_KEY}`)
      .then((response) => response.json())
      .then(({ coord: { lat, lon } }) => {
        return fetch(
          `${API_URL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
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
  handlerButton = () => {
    fetch(`${API_URL}weather?q=${cityName}&appid=${API_KEY}`)
      .then((response) => response.json())
      // .then((res) => console.log(res))
      .then(({ coord: { lat, lon } }) => {
        return fetch(
          `${API_URL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
        )
          .then((res) => res.json())
          .then((res) => {
            this.setState({ data: res });
          });
      });
  };

  render() {
    if (!this.state.data) {
      return <div>LOADING......</div>;
    } else {
      let {
        data: { current },
      } = this.state;
      console.log(current);
      return (
        <div className="body">
          <div className="main">
            <WeatherInfo
              current={this.state.data.current}
              cityName={cityName}
            />
            <SearchBox
              handlerInput={this.handlerInput}
              handlerButton={this.handlerButton}
            />
            <WeatherDetails current={this.state.data.current} />
          </div>
        </div>
      );
    }
  }
}
export default App;
