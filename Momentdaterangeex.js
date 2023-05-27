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
  ];

  const handleDateRangeChange = (event) => {
    const { name, value } = event.target;
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      [name]: value,
    }));
  };

  const filterDates = () => {
    const { start, end } = dateRange;

    const startDate = moment(start, ['MMDDYYYY', 'YYYYMMDD', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD-MMM-YYYY', 'YYYY-MMM-DD'], true);
    const endDate = moment(end, ['MMDDYYYY', 'YYYYMMDD', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD-MMM-YYYY', 'YYYY-MMM-DD'], true);

    const filtered = dates.filter((dateString) => {
      const date = moment(dateString, ['YYYY-MM-DD', 'MM/DD/YYYY', 'MMDDYYYY', 'DD-MMM-YYYY', 'YYYY-MMM-DD'], true);
      return date.isValid() && date.isBetween(startDate, endDate, null, '[]');
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
