import React, { useState } from 'react';

const stringArray = [
  'Some text 1 - 20/05/2023',
  '22-05-2023: Some text 2',
  'Some text 3 - 2023/05/25',
  '2023-05-28: Some text 4',
];

const extractDateFromText = (text) => {
  const regex = /(\d{1,2}[\/-]\d{1,2}[\/-]\d{4})/;
  const matches = text.match(regex);
  if (matches && matches.length > 0) {
    const dateString = matches[0];
    const [day, month, year] = dateString.split(/[\/-]/);
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  return null;
};

const filterArrayByDateRange = (startDate, endDate) => {
  const filtered = stringArray.filter((str) => {
    const date = extractDateFromText(str);
    return date && date >= startDate && date <= endDate;
  });
  setFilteredArray(filtered);
};

const YourComponent = () => {
  const [filteredArray, setFilteredArray] = useState(stringArray);

  const startDate = new Date(2023, 4, 21); // May is 4 because month is zero-based
  const endDate = new Date(2023, 4, 27); // May is 4 because month is zero-based

  filterArrayByDateRange(startDate, endDate);

  return (
    <div>
      <h1>Filtered Array:</h1>
      <ul>
        {filteredArray.map((str, index) => (
          <li key={index}>{str}</li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
