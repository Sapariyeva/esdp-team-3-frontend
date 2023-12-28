import React, { useState } from 'react';
import { Button, Drawer, Flex, Input, Space, Typography } from 'antd';
import { ERole } from '@/enum/role.enum';
import { ESearchFields, EUserStatus } from '@/enum/user.enum';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import './SearchBar.scss';
interface SearchBarProps {
    onSearch: (searchTerm: string, selectedStatus?: EUserStatus, selectedRole?: ERole, selectedSearchField?: ESearchFields) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<EUserStatus | null>(null);
    const [selectedRole, setSelectedRole] = useState<ERole | null>(null);
    const [selectedSearchField, setSelectedSearchField] = useState<ESearchFields | null>(null);

    const toggleStatus = (status: EUserStatus) => {
        setSelectedStatus(prevStatus => prevStatus === status ? null : status);
        console.log(`status`, status);
    };

    const toggleRole = (role: ERole) => {
        setSelectedRole(prevRole => prevRole === role ? null : role);
        console.log(`role`, role);
    };

    const toggleSearchField = (field: ESearchFields) => {
        setSelectedSearchField(prevField => prevField === field ? null : field);
        console.log(`field`, field);
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        onSearch(value, selectedStatus ?? undefined, selectedRole ?? undefined, selectedSearchField ?? undefined);
    };

    const handleApplyFilters = () => {
        onSearch(searchTerm, selectedStatus ?? undefined, selectedRole ?? undefined, selectedSearchField ?? undefined);
        setIsFilterDrawerVisible(false);
    };


    return (
        <>
            <div className="searchBarContainer" style={{ display: 'flex', alignItems: 'stretch' }}>
                <Input.Search
                    placeholder="Enter search term..."
                    onSearch={handleSearch}
                    enterButton={<SearchOutlined />}
                    className="searchInput"
                    style={{
                        flex: 1,

                    }}
                />
                <Button
                    icon={<FilterOutlined />}
                    onClick={() => setIsFilterDrawerVisible(true)}
                    className="filterButton"
                    style={{
                        alignSelf: 'stretch',
                        boxSizing: 'border-box',
                        marginLeft: '0',

                    }}
                />
            </div>



            <Drawer
                style={{ position: 'fixed' }}
                title="Настройки фильтра"
                placement="right"
                closable={true}
                onClose={() => setIsFilterDrawerVisible(false)}
                open={isFilterDrawerVisible}
                getContainer={false}
                styles={{ body: { paddingBottom: 80 } }}

            >
                <Space direction="vertical" size="middle">
                    <Flex
                        vertical
                        justify="flex-start"
                        align="flex-start"
                        gap="20px"
                        style={{ width: '100%', flexWrap: 'wrap' }}
                    >
                        {/* Фильтр по статусу */}
                        <Typography.Title level={5} style={{ marginBottom: '10px' }}>Статус</Typography.Title>
                        <Flex style={{ width: '100%', flexWrap: 'wrap' }}>
                            {Object.values(EUserStatus).map((statusValue) => (
                                <Button
                                    key={statusValue}
                                    type={selectedStatus === statusValue ? 'primary' : 'default'}
                                    onClick={() => toggleStatus(statusValue)}
                                    style={{
                                        backgroundColor: '#F5F4F2',
                                        border: 'none',
                                        marginRight: '13px',
                                        marginBottom: '15px',
                                    }}
                                >
                                    {statusValue}
                                </Button>
                            ))}
                        </Flex>

                        {/* Фильтр по роли */}
                        <Typography.Title level={5} style={{ marginBottom: '10px' }}>Роли</Typography.Title>
                        <Flex style={{ width: '100%', flexWrap: 'wrap' }}>
                            {Object.values(ERole).map((roleValue) => (
                                <Button
                                    key={roleValue}
                                    type={selectedRole === roleValue ? 'primary' : 'default'}
                                    onClick={() => toggleRole(roleValue)}
                                    style={{
                                        backgroundColor: '#F5F4F2',
                                        border: 'none',
                                        marginRight: '13px',
                                        marginBottom: '15px',
                                    }}
                                >
                                    {roleValue}
                                </Button>
                            ))}
                        </Flex>

                        {/* Фильтр по полю поиска */}
                        <Typography.Title level={5} style={{ marginBottom: '10px' }}>Поиск по</Typography.Title>
                        <Flex style={{ width: '100%', flexWrap: 'wrap' }}>
                            {Object.values(ESearchFields).map((field) => (
                                <Button
                                    key={field}
                                    type={selectedSearchField === field ? 'primary' : 'default'}
                                    onClick={() => toggleSearchField(field)}
                                    style={{
                                        backgroundColor: '#F5F4F2',
                                        border: 'none',
                                        marginRight: '13px',
                                        marginBottom: '15px',
                                    }}
                                >
                                    {field}
                                </Button>
                            ))}
                        </Flex>
                    </Flex>
                </Space>
            </Drawer>
        </>
    );
};

export default SearchBar;