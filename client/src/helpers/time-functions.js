//Function to generate hyphen formatted date
function getHyphenatedDate(date = Date.now()) {
  const d = new Date(Number(date));
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

//Function to generate slash formatted date
function getSlashedDate(date = Date.now()) {
  const d = new Date(Number(date));
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [day, month, year].join("/");
}
//Function to generate formatted time
function getFormattedTime(date = Date.now()) {
  const d = new Date(Number(date));
  let minutes = "" + d.getMinutes();
  let hours = "" + d.getHours();

  if (minutes.length < 2) minutes = "0" + minutes;
  if (hours.length < 2) hours = "0" + hours;
  return [hours, minutes].join(":");
}

//Funtion to get epoch in milliseconds from date time
function getEpoch(dateValue, timeValue) {
  const dateString = dateValue.toString().replace(/-/g, "/");
  const timeString = `${timeValue}:00`;
  const dateTime = new Date(`${dateString} ${timeString}`);
  return dateTime.getTime();
}

function addYearstoCurrentDate(years = 0) {
  let expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + years);
  return new Date(expiryDate);
}

export {
  getFormattedTime,
  getHyphenatedDate,
  getEpoch,
  getSlashedDate,
  addYearstoCurrentDate,
};
