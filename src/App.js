import "./App.css";
import Card from "./components/Card";

function App({ weatherInfo }) {
  return (
    <div className="card-container">
      {weatherInfo.map((weatherDay, index) => (
        <Card weatherDay={weatherDay} key={index} />
      ))}
    </div>
  );
}

export default App;
