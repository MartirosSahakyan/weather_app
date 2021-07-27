import { ARROW_TYPES } from "../../../helpers/constants";
import "./PaginationArrows.css";
import { ReactComponent as Left } from "../../../assets/SVG/arrow_left.svg";
import { ReactComponent as Right } from "../../../assets/SVG/arrow_right.svg";

export function PaginationArrows({ handleClick, arrow }) {
  return (
    <div onClick={handleClick} className="change-hours__arrow">
      {arrow === ARROW_TYPES.LEFT ? <Left /> : <Right />}
    </div>
  );
}
