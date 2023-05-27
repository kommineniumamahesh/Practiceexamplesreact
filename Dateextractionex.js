import React, { useState } from 'react';
import moment from 'moment';

function DateFilter() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const dates = [
    'Random text 2022-01-01 Random text',
    'Random text 12-15-2023 Random text',
    'Random text 2023/03/05 Random text',
    'Random text 2023-06-01 Random text',
    'Random text 05/01/2023 Random text',
    'Random text 20230510 Random text',
    'Random text 30-Jan-2024 Random text',
    'Random text 2024-Jan-30 Random text',
    'Random text 20210831 Random text',
  ];

  const handleDateRangeChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      [name]: value,
    }));
  };

  const extractDateFromString = (dateString) => {
    const regex = /\b\d{4}[-/]\d{2}[-/]\d{2}\b|\b\d{2}[-/]\d{2}[-/]\d{4}\b|\b\d{8}\b/g;
    const matchedDates = dateString.match(regex);
    if (matchedDates && matchedDates.length > 0) {
      return matchedDates[0];
    }
    return null;
  };

  const filterDates = () => {
    const { start, end } = dateRange;

    const startDate = moment(start, ['YYYYMMDD', 'YYYY-MM-DD', 'MM/DD/YYYY', 'MM-DD-YYYY'], true);
    const endDate = moment(end, ['YYYYMMDD', 'YYYY-MM-DD', 'MM/DD/YYYY', 'MM-DD-YYYY'], true);

    const filtered = dates.filter((dateString) => {
      const extractedDate = extractDateFromString(dateString);
      if (extractedDate) {
        const date = moment(extractedDate, ['YYYYMMDD', 'YYYY-MM-DD', 'MM/DD/YYYY', 'MM-DD-YYYY'], true);
        return date.isValid() && date.isBetween(startDate, endDate, null, '[]');
      }
      return false;
    });

    return filtered;
  };

  const filteredDates = filterDates();

  return (
    <div>
      <input
        type="text"
        name="start"
        placeholder="Start Date"
        value={dateRange.start}
        onChange={handleDateRangeChange}
      />
      <input
        type="text"
        name="end"
        placeholder="End Date"
        value={dateRange.end}
        onChange={handleDateRangeChange}
      />

      <ul>
        {filteredDates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </div>
  );
}

export default DateFilter;
