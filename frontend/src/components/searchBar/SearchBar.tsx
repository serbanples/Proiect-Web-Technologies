import './SearchBar.scss';
import { Icon } from 'react-icons-kit';
import { search } from 'react-icons-kit/feather';
import Filter from './Filter';
import { useState } from 'react';

type SearchBarProps = {
  id: string;
  onFilterChange: (filter: any) => void;
}

const SearchBar = ({ onFilterChange }: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onFilterChange({ key: 'text', value: searchText });
  }

  const filters = [
    [
      { label: 'Any Priority', value: 'any', key: 'priority' },
      { label: 'High Priority', value: 'high', key: 'priority' },
      { label: 'Medium Priority', value: 'medium', key: 'priority' },
      { label: 'Low Priority', value: 'low', key: 'priority' },
      { label: 'Critical Priority', value: 'critical', key: 'priority' }
    ],
    [
      { label: 'Any Status', value: 'any', key: 'status' },
      { label: 'In Progress', value: 'inProgress', key: 'status' },
      { label: 'Done', value: 'done', key: 'status' },
      { label: 'Closed', value: 'closed', key: 'status' },
      { label: 'New', value: 'new', key: 'status' },
      { label: 'Dev QA', value: 'devqa', key: 'status' }
    ]
  ]

  return (
    <div className="search-bar">
      <span className="search-bar-filters">
        {filters.map((filter) => (
          <span className="search-bar-filter">
            <Filter
              options={filter}
              selectedOption={filter[0]}
              onChange={(option) => onFilterChange(option)}
            />
          </span>
        ))}
      </span>
      <span className="search-bar-input-container">
        <input 
          type="text" 
          placeholder="Search" 
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              handleSearch();
            }}}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Icon icon={search} className="search-icon" onClick={handleSearch} />
      </span>
    </div>
  )
}

export default SearchBar