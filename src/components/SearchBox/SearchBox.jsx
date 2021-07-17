import "./SearchBox.css";

export function SearchBox({ handlerInput, handlerSearchButton, handlerChangeUnits,units }) {
  return (
    <div className="weather-info">
      <div className="search-box">
        <input
          onChange={handlerInput}
          type="text"
          className="search-box-input"
          placeholder="Search Location..."
        />
        <div onClick={handlerSearchButton} className="search">
       
        </div>
      </div>
      <div onClick ={handlerChangeUnits}  className="weather-info__units">
        {units === 'metric' ? 'Display °F' : 'Display °C'}
          </div> 
    </div>
  );
}
