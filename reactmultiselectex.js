import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple', isChecked: false },
      { value: 'banana', label: 'Banana', isChecked: false },
      { value: 'orange', label: 'Orange', isChecked: false },
    ],
    isChecked: false,
  },
  {
    label: 'Colors',
    options: [
      { value: 'red', label: 'Red', isChecked: false },
      { value: 'blue', label: 'Blue', isChecked: false },
      { value: 'green', label: 'Green', isChecked: false },
    ],
    isChecked: false,
  },
];

const MultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected.map((option) => option.value));
  };

  const handleSectionChange = (section, checked) => {
    const updatedOptions = options.map((opt) => {
      if (opt.label === section.label) {
        return {
          ...opt,
          isChecked: checked,
          options: opt.options.map((subOption) => ({
            ...subOption,
            isChecked: checked,
          })),
        };
      }
      return opt;
    });

    const newSelectedOptions = checked
      ? [
          ...selectedOptions,
          ...section.options.map((subOption) => subOption.value),
        ]
      : selectedOptions.filter(
          (value) => !section.options.some((subOption) => subOption.value === value)
        );

    setSelectedOptions(newSelectedOptions);
    setOptions(updatedOptions);
  };

  const handleOptionChange = (option) => {
    option.isChecked = !option.isChecked;
    const selectedValues = selectedOptions.includes(option.value)
      ? selectedOptions.filter((value) => value !== option.value)
      : [...selectedOptions, option.value];
    setSelectedOptions(selectedValues);
    setOptions([...options]);
  };

  const setOptions = (updatedOptions) => {
    updatedOptions.forEach((section) => {
      const sectionChecked = section.options.every((option) => option.isChecked);
      section.isChecked = sectionChecked;
    });

    // Update the options
    setOptions(updatedOptions);
  };

  const SectionOption = ({ options, label }) => (
    <div>
      <label>
        <input
          type="checkbox"
          checked={options.every((option) => option.isChecked)}
          onChange={(e) => handleSectionChange({ options, label }, e.target.checked)}
        />
        {label}
      </label>
      {options.map((option) => (
        <div key={option.value}>
          <label>
            <input
              type="checkbox"
              checked={option.isChecked}
              onChange={() => handleOptionChange(option)}
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <Select
      options={options.map((section) => ({
        ...section,
        options: section.options.map((option) => ({
          ...option,
        })),
      }))}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{ Option: SectionOption }}
      value={selectedOptions.map((value) => ({
        value,
        label: options
          .flatMap((section) => section.options)
          .find((option) => option.value === value).label,
      }))}
      onChange={handleChange}
    />
  );
};

