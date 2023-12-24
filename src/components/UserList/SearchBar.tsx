import React, { useState } from 'react';
import { Button, Flex, Input, Modal, Space, Typography } from 'antd';
import { ERole } from '@/enum/role.enum';
import { ESearchFields, EUserStatus } from '@/enum/user.enum';
import {  FilterOutlined, SearchOutlined} from '@ant-design/icons';
import './SearchBar.scss';
interface SearchBarProps {
    onSearch: (searchTerm: string, selectedStatus?: EUserStatus, selectedRole?: ERole, selectedSearchField?: ESearchFields) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
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
        setIsFilterModalVisible(false);
    };


    return (
        <>
            <div className="searchBarContainer">
                <Input.Search
                    placeholder="Enter search term..."
                    onSearch={handleSearch}
                    enterButton={<SearchOutlined />}
                    className="searchInput"
                />
                <Button
                    icon={<FilterOutlined />}
                    onClick={() => setIsFilterModalVisible(true)}
                    className="filterButton"
                />
            </div>

            <Modal
                title="Настройки фильтра"
                visible={isFilterModalVisible}
                onOk={handleApplyFilters}
                onCancel={() => setIsFilterModalVisible(false)}
                width="100%" 
                className="modalCustomStyle"
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleApplyFilters}
                    >
                        Применить
                    </Button>
                ]}
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
            </Modal>
        </>
    );
};

export default SearchBar;