import React, { useState } from 'react';
import './Dropdown.scss';
import { Icon } from 'react-icons-kit';
import { chevronDown, chevronUp } from 'react-icons-kit/feather';

type DropdownOption = {
  label: string;
  value: string;
  disabled?: boolean;
}

type DropdownProps = {
  defaultOption: DropdownOption;
  options: DropdownOption[];
  onChange: (option: DropdownOption) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ defaultOption, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: DropdownOption) => {
    if (option.disabled) return;
    onChange(option);
    setIsOpen(false);
  }

  return (
    <div className="dropdown-container">
      <div 
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {defaultOption.label}
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

export default Dropdown