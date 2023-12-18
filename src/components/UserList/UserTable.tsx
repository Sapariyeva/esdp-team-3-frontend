import React from 'react';
import { Table, TableProps } from 'antd';
import { IUser } from '@/interfaces/user.interface';
import { ERole } from '@/enum/role.enum';
import { EUserStatus } from '@/enum/user.enum';


interface UserTableProps {
    users: IUser[];
}
const getFiltersFromEnum = (enumObject: Record<string, string>) => {
    return Object.keys(enumObject).map((key) => ({
        text: enumObject[key],
        value: enumObject[key],
    }));
};

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            render: (text: number) => text || 'N/A',
        },
        {
            title: 'Name',
            dataIndex: 'displayName',
            key: 'displayName',
            sorter: (a, b) => a.displayName.localeCompare(b.displayName),
            render: (text: string) => text || 'N/A',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b) => {
                const phoneA = a.phone || '';
                const phoneB = b.phone || '';
                return phoneA.localeCompare(phoneB);
            },
            render: (text: string | null) => text || 'N/A',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => (a.email || '').localeCompare(b.email || ''),
            render: (text: string) => text || 'N/A',
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
            sorter: (a, b) => (a.birthday || '').localeCompare(b.birthday || ''),
            render: (text: string) => text || 'N/A',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters: getFiltersFromEnum(ERole),
            onFilter: (value, record) => record.role === value,
            sorter: (a, b) => a.role.localeCompare(b.role),
            render: (text: string) => text || 'N/A',
        },
        {
            title: 'Average Rating',
            dataIndex: 'avgRating',
            key: 'avgRating',
            sorter: (a, b) => (a.avgRating || 0) - (b.avgRating || 0),
            render: (text: number) => (text !== null && text !== undefined) ? text : 'N/A',
        },
        {
            title: 'Rating Count',
            dataIndex: 'ratingCount',
            key: 'ratingCount',
            sorter: (a, b) => (a.ratingCount || 0) - (b.ratingCount || 0),
            render: (text: number) => (text !== null && text !== undefined) ? text : 'N/A',
        },
        {
            title: 'Identifying Number',
            dataIndex: 'identifyingNumber',
            key: 'identifyingNumber',
            sorter: (a, b) => {
                const numA = a.identifyingNumber !== null ? a.identifyingNumber.toString() : '';
                const numB = b.identifyingNumber !== null ? b.identifyingNumber.toString() : '';
                return numA.localeCompare(numB, undefined, { numeric: true }); 
            },
            render: (text: number | null) => text !== null ? text.toString() : 'N/A',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: getFiltersFromEnum(EUserStatus),
            onFilter: (value, record) => record.status === value,
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (text: string) => text || 'N/A',
        },
    ];

    return <Table columns={columns} dataSource={users} rowKey="id" />;
};

export default UserTable;