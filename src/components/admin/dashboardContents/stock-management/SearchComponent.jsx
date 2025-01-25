import React, { useState } from 'react';

const records = [
  { id: 1, name: 'Tomato' },
  { id: 2, name: 'Potato' },
  { id: 3, name: 'Carrot' },
  { id: 4, name: 'Onion' },
  { id: 5, name: 'Cucumber' },
];

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState(records);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = records.filter(record =>
      record.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRecords(filtered);
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        placeholder="Search for a vegetable..." 
      />
      <ul>
        {filteredRecords.map((record) => (
          <li key={record.id}>{record.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
