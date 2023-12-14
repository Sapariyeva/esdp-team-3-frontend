import React from 'react';

interface SearchBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <input
            type="text"
            placeholder="Search users..."
            onChange={(e) => onSearch(e.target.value)}
        />
    );
};

export default SearchBar;