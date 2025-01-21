export const timeConverter = (time24) => {
  // Split the time into hours and minutes
  let [hours, minutes] = time24.split(":");
  hours = parseInt(hours);

  // Determine AM or PM
  let period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Return the formatted time
  return `${hours}:${minutes} ${period}`;
};
