const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options = { month: "short", day: "numeric", year: "2-digit" };

  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${start.toLocaleDateString("en-US", {
      month: "short",
    })} ${start.getDate()}${getOrdinalSuffix(
      start.getDate()
    )} - ${end.getDate()}${getOrdinalSuffix(end.getDate())}, ${start
      .getFullYear()
      .toString()
      .slice(-2)}`;
  } else {
    return `${start.toLocaleDateString(
      "en-US",
      options
    )} - ${end.toLocaleDateString("en-US", options)}`;
  }
};
