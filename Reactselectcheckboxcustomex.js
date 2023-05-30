import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const CheckboxOption = ({ children, isSelected, innerProps }) => (
  <div {...innerProps}>
    <input type="checkbox" checked={isSelected} readOnly />
    <label>{children}</label>
  </div>
);

const CheckboxSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  return (
    <Select
      options={options}
      value={selectedOptions}
      onChange={handleSelectChange}
      isMulti
      closeMenuOnSelect={false}
      components={{ Option: CheckboxOption }}
    />
  );
};

const App = () => {
  return (
    <div>
      <h1>Checkbox Select Example</h1>
      <CheckboxSelect />
    </div>
  );
};

export default App;
