import React, { useState } from 'react'
import { Icon } from 'react-icons-kit';
import { chevronUp, chevronDown } from 'react-icons-kit/feather';

type DropdownOption = {
  label: string;
  key: string;
  value: string;
  disabled?: boolean;
}

type FilterProps = {
  options: DropdownOption[];
  selectedOption: DropdownOption;
  onChange: (option: DropdownOption) => void;
}

const Filter: React.FC<FilterProps> = ({ options, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSelectedOption, setCurrentSelectedOption] = useState(selectedOption);

  const handleOptionClick = (option: DropdownOption) => {
    if (option.disabled) return;
    setCurrentSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  }
  
  return (
    <div className="dropdown-container">
      <div 
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentSelectedOption.label}
        <Icon icon={isOpen ? chevronUp : chevronDown} className="dropdown-button-icon" />
      </div>
      {isOpen && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div 
              key={option.value} 
              onClick={() => handleOptionClick(option)}
              className={"dropdown-item" + (option.disabled ? ' disabled' : '')}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Filter