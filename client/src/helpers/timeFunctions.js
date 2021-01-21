//Function to generate formatted date for input
function getFormattedDate(date = Date.now()) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}
//Function to generate formatted time for input
function getFormattedTime(date = Date.now()) {
  const d = new Date(date);
  let minutes = "" + d.getMinutes();
  let hours = "" + d.getHours();

  if (minutes.length < 2) minutes = "0" + minutes;
  if (hours.length < 2) hours = "0" + hours;
  return [hours, minutes].join(":");
}

export { getFormattedTime, getFormattedDate };
