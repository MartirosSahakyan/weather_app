import "./SearchBox.css";

export function SearchBox({ handlerInput, handlerButton }) {
  return (
    <div className="weather-info">
      <div className="search-box">
        <input
          onChange={handlerInput}
          type="text"
          className="search-box-input"
          placeholder="Search Location..."
        />
        <div onClick={handlerButton} className="search">
         
        </div>
      </div>
    </div>
  );
}
