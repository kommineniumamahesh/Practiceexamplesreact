const filterDates = () => {
  const { start, end } = dateRange;

  const startDate = new Date(start);
  const endDate = new Date(end);

  const filtered = dates.filter((dateString) => {
    const dateRegex = /(\d{4}[-/]\d{2}[-/]\d{2})|(\d{8})/;
    const matches = dateString.match(dateRegex);

    if (matches) {
      const date = matches[1] || matches[2];
      return new Date(date) >= startDate && new Date(date) <= endDate;
    }

    return false;
  });

  return filtered;
};
