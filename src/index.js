import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import reportWebVitals from './reportWebVitals';

const weatherInfo = [
  {
    weekDey: "Monday",
    imgURL: "",
    temp: "36C",
  },
  {
    weekDey: "Tuesday",
    imgURL: "",
    temp: "32C",
  },
  {
    weekDey: "Wednesday",
    imgURL: "",
    temp: "35C",
  },
  {
    weekDey: "Thursday",
    imgURL: "",
    temp: "45C",
  },
  {
    weekDey: "Friday",
    imgURL: "",
    temp: "36C",
  },
  {
    weekDey: "Saturday",
    imgURL: "",
    temp: "37C",
  },
  {
    weekDey: "Sunday",
    imgURL: "",
    temp: "39C",
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App weatherInfo={weatherInfo}/>,
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals();
