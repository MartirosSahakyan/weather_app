import cn from "classnames";
import "./DetailButton.css";

export function DetailButton({ handleClick, detailType, text }) {
  return (
    <div
      onClick={handleClick}
      className={cn("detail-btn", {
        "detail-btn_selected": detailType === text,
      })}
    >
      {text}
    </div>
  );
}
