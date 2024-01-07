import React, { useState } from 'react';
import { Button, Flex, Input, Modal, Space, Typography } from 'antd';
import { ERole } from '@/enum/role.enum';
import { ESearchFields, EUserStatus } from '@/enum/user.enum';

import { FilterTwoTone} from '@ant-design/icons';

import './SearchBar.scss';
import translateValue, { roleDictionary, searchFieldsDictionary, statusDictionary } from '@/helpers/translate.helper';
interface SearchBarProps {
    onSearch: (
        searchTerm: string,
        selectedStatus?: EUserStatus | null, 
        selectedRole?: ERole | null, 
        selectedSearchField?: ESearchFields | null 
    ) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<EUserStatus | null>(null);
    const [selectedRole, setSelectedRole] = useState<ERole | null>(null);
    const [selectedSearchField, setSelectedSearchField] = useState<ESearchFields | null>(null);
    const [isSelectFieldModalVisible, setIsSelectFieldModalVisible] = useState(false);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
    const toggleStatus = (status: EUserStatus) => {
        const newStatus = selectedStatus === status ? null : status;
        setSelectedStatus(newStatus);
        onSearch(searchTerm, newStatus, selectedRole, selectedSearchField);
    };

    const toggleRole = (role: ERole) => {
        const newRole = selectedRole === role ? null : role;
        setSelectedRole(newRole);
        onSearch(searchTerm, selectedStatus, newRole, selectedSearchField);
    };

    const toggleSearchField = (field: ESearchFields) => {
        const newField = selectedSearchField === field ? null : field;
        setSelectedSearchField(newField);
        if (searchTerm) {
            onSearch(searchTerm, selectedStatus, selectedRole, newField);
        }
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        if (debounceTimer) clearTimeout(debounceTimer);

        const newTimer = setTimeout(() => {
            if (selectedSearchField) {
                onSearch(value, selectedStatus, selectedRole, selectedSearchField);
            } else {
                setIsSelectFieldModalVisible(true);
            }
        }, 500); 

        setDebounceTimer(newTimer);
    };

    const handleApplyFilters = () => {
        onSearch(searchTerm, selectedStatus, selectedRole, selectedSearchField);
        setIsFilterModalVisible(false);
    };
    


    return (
        <>
            <div className="searchBarContainer">
                <Input
                    placeholder="Введите текст для поиска..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="searchInput"
                />
                <Button
                    icon={<FilterTwoTone />} 
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
                footer={[]}

            >
                <Space className='123' direction="vertical" size="middle" style={{ padding: '0px' }}>
                    <Flex
                        vertical
                        justify="flex-start"
                        align="flex-start"
                        gap="20px"
                        style={{ width: '100%', flexWrap: 'wrap' }}
                    >
                        {/* Фильтр по статусу */}
                        <Typography.Title level={5} style={{ marginBottom: '10px' }}>Статус</Typography.Title>
                        <Flex style={{ width: '100%', flexWrap: 'wrap', gap: '13px' }}>
                            {Object.values(EUserStatus).map((statusValue) => (
                                <Button
                                    key={statusValue}
                                    type={selectedStatus === statusValue ? 'primary' : 'default'}
                                    onClick={() => toggleStatus(statusValue)}
                                    size="small" 
                                    style={{

                                        width: '45%', 
                                        height: '29px', 
                                        borderColor: '#006698', 
                                        fontSize: '14px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        padding: 0, 
                                        maxWidth:'152px'

                                    }}
                                >
                                    {translateValue(statusValue, statusDictionary)}
                                </Button>
                            ))}
                        </Flex>

                        {/* Фильтр по роли */}
                        <Typography.Title level={5} style={{ marginBottom: '10px' }}>Роли</Typography.Title>
                        <Flex style={{ width: '100%', flexWrap: 'wrap', gap: '13px' }}>
                            {Object.values(ERole).map((roleValue) => (
                                <Button
                                    key={roleValue}
                                    type={selectedRole === roleValue ? 'primary' : 'default'}
                                    onClick={() => toggleRole(roleValue)}
                                    size="small"
                                    style={{

                                        width: '45%',
                                        height: '29px',
                                        borderColor: '#006698',
                                        fontSize: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        maxWidth: '152px'

                                    }}
                                >
                                    
                                    {translateValue(roleValue, roleDictionary)}
                                </Button>
                            ))}
                        </Flex>

                        {/* Фильтр по полю поиска */}
                        <Typography.Title level={5} style={{ marginBottom: '10px' }}>Поиск по</Typography.Title>
                        <Flex style={{ width: '100%', flexWrap: 'wrap', gap: '13px' }}>
                            {Object.values(ESearchFields).map((field) => (
                                <Button
                                    key={field}
                                    type={selectedSearchField === field ? 'primary' : 'default'}
                                    onClick={() => toggleSearchField(field)}
                                    size="small"
                                    style={{

                                        width: '45%',
                                        height: '29px',
                                        borderColor: '#006698',
                                        fontSize: '14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        maxWidth: '152px'

                                    }}
                                >
                                    
                                    {translateValue(field, searchFieldsDictionary)}
                                </Button>
                            ))}
                        </Flex>
                    </Flex>
                </Space>
            </Modal>
            <Modal
                title="Выбор поля для поиска"
                visible={isSelectFieldModalVisible}
                onCancel={() => setIsSelectFieldModalVisible(false)}
                footer={null} 
                className="selectFieldModalStyle" 
            >
                <Space direction="vertical">
                    <p>Пожалуйста, выберите поле, по которому хотите выполнить поиск.</p>
                    {Object.values(ESearchFields).map((field) => (
                        <Button
                            key={field}
                            type={selectedSearchField === field ? 'primary' : 'default'}
                            onClick={() => {
                                toggleSearchField(field);
                                setIsSelectFieldModalVisible(false);
                            }}
                            className={selectedSearchField === field ? 'selectedFieldButton' : ''}
                        >
                            {field}
                        </Button>
                    ))}
                </Space>
            </Modal>
        </>
    );
};


export default SearchBar;