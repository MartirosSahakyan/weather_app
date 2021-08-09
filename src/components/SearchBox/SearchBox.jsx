import PropTypes from "prop-types";
import "./SearchBox.css";
import { CityNameError } from "../Error/CityNameError/CityNameError";
import { Loading } from "../Loading/Loading";

export function SearchBox({
  handlerInput,
  handlerSearchButton,
  handlerKeyDown,
  handlerChangeUnits,
  units,
  error,
  loading,
}) {
  return (
    <div className="weather-info">
      <div className="search-box">
        <input
          onChange={handlerInput}
          onKeyDown={handlerKeyDown}
          type="text"
          className="search-box-input"
          placeholder="Search Location..."
        />
        {loading ? (
          <Loading />
        ) : (
          <div onClick={handlerSearchButton} className="search"></div>
        )}
      </div>
      {error && <CityNameError />}

      <div onClick={handlerChangeUnits} className="weather-info__units">
        {units === "metric" ? "Display °F" : "Display °C"}
      </div>
    </div>
  );
}

SearchBox.propTypes = {
  handlerInput: PropTypes.func.isRequired,
  handlerSearchButton: PropTypes.func.isRequired,
  handlerKeyDown: PropTypes.func.isRequired,
  handlerChangeUnits: PropTypes.func.isRequired,
  units: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};
