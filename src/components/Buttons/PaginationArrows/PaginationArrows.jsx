// import cn from "classnames";
import { ARROW_TYPES } from "../../../helpers/constants";
import "./PaginationArrows.css";

export function PaginationArrows({ handleClick, arrow }) {
  return (
    <div onClick={handleClick} className="change-hours__arrow">
      {arrow === ARROW_TYPES.LEFT ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="8.02 6 7.41 12"
          fill="#f5f5f5"
        >
          <title>arrow_left</title>
          <path d="M15.422 16.594l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="8.58 6 7.41 12"
          fill="#f5f5f5"
        >
          <title>arrow_right</title>
          <path d="M8.578 16.594l4.594-4.594-4.594-4.594 1.406-1.406 6 6-6 6z" />
        </svg>
      )}
    </div>
  );
}
