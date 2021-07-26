import "./CityNameError.css";

export function CityNameError(params) {
  return (
    <div className="error-msg">
      Location not found.
      <br />
      Search must be in the form of "City", "City, State" or "City, Country".
    </div>
  );
}
