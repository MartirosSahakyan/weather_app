import "./SearchBox.css";

export function SearchBox({
  handlerInput,
  handlerSearchButton,
  handlerKeyDown,
  handlerChangeUnits,
  units,
  error,
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
        <div onClick={handlerSearchButton} className="search"></div>
      </div>
      {error && (
        <div className="error-msg">
          Location not found.
          <br />
          Search must be in the form of "City", "City, State" or "City,
          Country".
        </div>
      )}

      <div onClick={handlerChangeUnits} className="weather-info__units">
        {units === "metric" ? "Display °F" : "Display °C"}
      </div>
    </div>
  );
}
