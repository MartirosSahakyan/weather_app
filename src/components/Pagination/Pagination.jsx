import { ARROW_TYPES } from "../../constants/constants";
import { PaginationArrows } from "../Buttons/PaginationArrows/PaginationArrows";
import { PaginationDots } from "../Buttons/PaginationDots/PaginationDots";
import "./Pagination.css";

export function Pagination({
  handleLeftClick,
  handleDotsClick,
  handleRightClick,
  pages,
}) {
    
  return (
    <div className="change-hours">
      <PaginationArrows
        handleClick={handleLeftClick}
        arrow={ARROW_TYPES.LEFT}
      />
      <PaginationDots
        handleClick={(id) => handleDotsClick(1)}
        page={pages.page1}
      />
      <PaginationDots
        handleClick={(id) => handleDotsClick(2)}
        page={pages.page2}
      />
      <PaginationDots
        handleClick={(id) => handleDotsClick(3)}
        page={pages.page3}
      />
      <PaginationArrows
        handleClick={handleRightClick}
        arrow={ARROW_TYPES.RIGHT}
      />
    </div>
  );
}
