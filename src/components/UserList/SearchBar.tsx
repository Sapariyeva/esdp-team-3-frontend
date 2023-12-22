import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { ERole } from '@/enum/role.enum';
import { EUserStatus } from '@/enum/user.enum';

const { Search } = Input;
const { Option } = Select;

interface ISearchBarProps {
    onSearch: (searchField?: string, searchTerm?: string, status?: EUserStatus | undefined, role?: ERole | undefined) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch }) => {
    const [searchField, setSearchField] = useState<string | undefined>();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [status, setStatus] = useState<EUserStatus | undefined>();
    const [role, setRole] = useState<ERole | undefined>();

    const handleSearchFieldChange = (value: string) => {
        setSearchField(value);
    };

    const handleStatusChange = (value: EUserStatus) => {
        setStatus(value);
    };

    const handleRoleChange = (value: ERole) => {
        setRole(value);
    };

    const handleSearch = (value: string) => {

        setSearchTerm(value);
        onSearch(searchField, value, status, role);
    };

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Select
                placeholder="Поиск"
                style={{ width: 200 }}
                onChange={handleSearchFieldChange}
                value={searchField}
            >
                <Option value="displayName">Display Name</Option>
                <Option value="email">Email</Option>
                <Option value="phone">Phone</Option>
                <Option value="identifyingNumber">Identifying Number</Option>
            </Select>

            <Select
                placeholder="Select Status"
                style={{ width: 200 }}
                onChange={handleStatusChange}
                value={status}
            >
                {/* Плейсхолдер сейчас не нужен как Option, так как он уже установлен в самом Select */}
                {Object.values(EUserStatus).map((statusValue) => (
                    <Option key={statusValue} value={statusValue}>{statusValue}</Option>
                ))}
            </Select>

            <Select
                placeholder="Select Role"
                style={{ width: 200 }}
                onChange={handleRoleChange}
                value={role}
            >
                {/* То же самое применяется и здесь */}
                {Object.values(ERole).map((roleValue) => (
                    <Option key={roleValue} value={roleValue}>{roleValue}</Option>
                ))}
            </Select>

            {/* Поисковая строка */}
            <Search
                placeholder="Enter search term..."
                onSearch={handleSearch}
                style={{ flexGrow: 1 }}
            />
        </div>
    );
};

export default SearchBar;