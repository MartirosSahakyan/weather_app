import "./PaginationDots.css";
import cn from "classnames";

export function PaginationDots({ handleClick, page }) {
  return (
    <div
      onClick={handleClick}
      className={cn("dot", { "dot-selected": page })}
    ></div>
  );
}
