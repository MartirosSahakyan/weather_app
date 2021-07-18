export function formatDate(seconds) {
  const miliseconds = seconds * 1000;
  const date = new Date(miliseconds);
  return date.toDateString();
}
// console.log(formatDate(1626521823));

export function formatTime(seconds) {
  const miliseconds = seconds * 1000;
  const date = new Date(miliseconds);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${hour}:${minutes} `;
}
// console.log(formatTime(1626521823));

export function toUpperCaseWords(string) {
  return string
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export const handleResponse = (response) => {
  return response.json().then(json => {
      return response.ok ? json : Promise.reject(json);
  });
}