const filterDates = () => {
  const { start, end } = dateRange;

  const startDate = parseDate(start);
  const endDate = parseDate(end);

  const filtered = dates.filter((dateString) => {
    const dateRegex = /(\d{4}[-/]\d{2}[-/]\d{2})|(\d{8})/;
    const matches = dateString.match(dateRegex);

    if (matches) {
      const date = matches[1] || matches[2];
      return parseDate(date) >= startDate && parseDate(date) <= endDate;
    }

    return false;
  });

  return filtered;
};

const parseDate = (dateString) => {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return new Date(year, parseInt(month, 10) - 1, day);
};
