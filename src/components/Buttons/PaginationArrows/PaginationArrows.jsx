import PropTypes from "prop-types";
import "./PaginationArrows.css";
import { ARROW_TYPES } from "../../../constants/constants";
import { ReactComponent as Left } from "../../../assets/SVG/arrow_left.svg";
import { ReactComponent as Right } from "../../../assets/SVG/arrow_right.svg";

export function PaginationArrows({ handleClick, arrow }) {
  return (
    <div onClick={handleClick} className="change-hours__arrow">
      {arrow === ARROW_TYPES.LEFT ? <Left /> : <Right />}
    </div>
  );
}

PaginationArrows.propTypes = {
  handleClick: PropTypes.func.isRequired,
  arrow: PropTypes.string.isRequired,
};
