import React from 'react';
import { useForm } from 'react-hook-form';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function DateRangeForm() {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleDateRangeChange = (ranges) => {
    setValue('startDate', ranges.selection.startDate.toISOString());
    setValue('endDate', ranges.selection.endDate.toISOString());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DateRangePicker
        onChange={handleDateRangeChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={[
          {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
          },
        ]}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

function App() {
  return (
    <div>
      <h1>Date Range Selection</h1>
      <DateRangeForm />
    </div>
  );
}

export default App;
