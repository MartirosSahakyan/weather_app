import cn from "classnames";
import "./PaginationDots.css";

export function PaginationDots({ handleClick, page }) {
  return (
    <div
      onClick={handleClick}
      className={cn("dot", { "dot-selected": page })}
    ></div>
  );
}
