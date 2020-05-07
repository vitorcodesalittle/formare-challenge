export const formatDate = (dateOrUTCString) => {
  let date;
  if (typeof dateOrUTCString === 'string') {
    date = new Date(dateOrUTCString);
  } else if (typeof dateOrUTCString === 'object') {
    date = dateOrUTCString;
  }
  console.log(dateOrUTCString, ' the date being trnasformed is now ', date);

  let DD = date.getDay();
  let MM = date.getMonth();
  let YYYY = date.getFullYear();
  let HH = date.getHours();
  let mm = date.getMinutes();
  let SS = date.getSeconds();
  return `${DD}/${MM}/${YYYY} - ${HH}:${mm}:${SS}`

}

export const getDateObject = (year, month, day, hours, minutes, seconds) => new Date(year, month, day, hours, minutes, seconds);


