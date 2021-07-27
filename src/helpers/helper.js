export function formatDate(seconds) {
  const miliseconds = seconds * 1000;
  const date = new Date(miliseconds);
  return date.toDateString();
}

export function formatWeekDay(seconds) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const miliseconds = seconds * 1000;
  const date = new Date(miliseconds);
  return weekDays[date.getDay()];
}

export function formatTime(seconds) {
  const miliseconds = seconds * 1000;
  const date = new Date(miliseconds);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${hour}:${minutes} `;
}

export function formatHourAmPm(seconds) {
  const miliseconds = seconds * 1000;
  const date = new Date(miliseconds);
  const hour = Number(date.getHours());
  if (hour === 0) {
    return `12 am`;
  } else if (hour === 24) {
    return `${hour} pm`;
  } else if (hour > 12) {
    return `${hour - 12} pm`;
  } else {
    return `${hour} am`;
  }
}

export function toUpperCaseWords(string) {
  return string
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
