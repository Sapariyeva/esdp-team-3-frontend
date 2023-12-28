import { useState } from 'react';
import { DownloadOutlined, HomeOutlined, OrderedListOutlined, TeamOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './Sidebar.scss'
import Sider from 'antd/es/layout/Sider';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: (
            <a href="/">
                Home
            </a>
        ),
        key: 'home',
        icon: <HomeOutlined />
    },
    {
        type: 'divider'
    },
    {
        label: (
            <a href="/signin">
                Sign in
            </a>
        ),
        key: 'signin',
        icon: <UserOutlined />
    },
    {
        label: (
            <a href="/signup">
                Sign up
            </a>
        ),
        key: 'signup',
        icon: <UserAddOutlined />
    },
    {
        type: 'divider'
    },
    {
        label: (
            <a href="/order">
                Order List
            </a>
        ),
        key: 'order',
        icon: <OrderedListOutlined />
    },
    {
        label: (
            <a href="/user">
                User List
            </a>
        ),
        key: 'user',
        icon: <TeamOutlined />
    },
    {
        label: 'Exports',
        key: 'exports',
        icon: <DownloadOutlined />,
        children: [
            {
                label: (
                    <a href="http://localhost:8000/order/export-csv">
                        Order List export
                    </a>
                ),
                key: 'order/export-csv',
            },
            {
                label: (
                    <a href="http://localhost:8000/user/export-csv">
                        User List export
                    </a>
                ),
                key: 'user/export-csv',
            },
        ],
    },
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            style={{
                overflow: "auto",
                height: "100vh",
                position: "sticky",
                top: 0,
                left: 0,
                zIndex: 1
            }}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div className="logo" />
            <Menu defaultSelectedKeys={['1']} theme='dark' mode="inline" items={items} />
        </Sider>
    )
};
export default Sidebar;