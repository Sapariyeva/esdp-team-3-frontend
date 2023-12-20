import React, { useState } from 'react';
import { Input, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;

interface SearchBarProps {
    onSearch: (field: string, value: string) => void;
    setSearchField: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [selectedField, setSelectedField] = useState('displayName'); 
    const handleSearch = (value: string) => {
        onSearch(selectedField, value);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Select
                defaultValue="displayName"
                style={{ width: 200, marginRight: 8 }}
                onChange={setSelectedField} 
                size="large"    
            >
                <Option value="displayName">Display Name</Option>
                <Option value="phone">Phone</Option>
                <Option value="identifyingNumber">identifying Number</Option>
            </Select>
            <Search
                placeholder="Enter search term..."
                onSearch={handleSearch} 
                enterButton
                size="large"
            />
        </div>
    );
};

export default SearchBar;