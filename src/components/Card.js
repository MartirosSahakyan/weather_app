import "./Card.css";

function Card({ weatherDay }) {
  return (
    <div className="card">
      <div className="card-header">{weatherDay.weekDey}</div>
      <div className="card-image">
        {/* <img src={weatherDay.imgURL}></img> */}
        
      </div>
      <div className="card-footer">{weatherDay.temp}</div>
    </div>
  );
}

export default Card;
