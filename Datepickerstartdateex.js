Here's an example of how to create a date picker with start and end date using React Hook Forms:

```jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateRangePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="start-date">Start Date</label>
        <br />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div>
        <label htmlFor="end-date">End Date</label>
        <br />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DateRangePicker;
```

In this example, we're using the `useState` hook to create state variables for the start and end dates. We're also using the `useForm` hook from `react-hook-form` to handle form submission.

We're rendering two `DatePicker` components from `react-datepicker`. The first date picker is for the start date, and the second one is for the end date. We're passing in the start and end dates as props to the respective `DatePicker` components. We're also using the `selectsStart` and `selectsEnd` props to indicate which date picker controls which date. Additionally, we're using the `minDate` prop on the end date `DatePicker` to prevent users from selecting an end date that is before the start date.

When the form is submitted, the `onSubmit` function is called, and we're logging the form data to the console.
