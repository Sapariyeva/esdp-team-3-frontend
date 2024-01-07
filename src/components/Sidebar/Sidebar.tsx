import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownloadOutlined, HomeOutlined, OrderedListOutlined, TeamOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { exportOrderListToCSV } from '@/app/order.slice';
import { exportUserListToCSV, signOut } from '@/app/user.slice';
import './Sidebar.scss'

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useAppSelector(store => store.user)
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const items: MenuItem[] = [];

    if (!localStorage.getItem('token')) {
        items.push(...[
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
            }
        ]);
    } else {
        items.push(...[
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
                            <span onClick={() => dispatch(exportOrderListToCSV())}>
                                Order List export
                            </span>
                        ),
                        key: 'order/export-csv',
                    },
                    {
                        label: (
                            <span onClick={() => dispatch(exportUserListToCSV())}>
                                User List export
                            </span>
                        ),
                        key: 'user/export-csv',
                    },
                ],
            },
            {
                label: (
                    <span onClick={() => dispatch(signOut())}>
                        Sign out
                    </span>
                ),
                key: 'signout',
                icon: <TeamOutlined />
            }]);
    }

    useEffect(() => {
        const pathName = window.location.pathname;
        if (localStorage.getItem('token') && (pathName === '/signup' || pathName === '/signin')) {
            navigate('/');
        } else if (!localStorage.getItem('token') && pathName !== '/signup' && pathName !== '/signin') {
            navigate('/signin');
        }
    }, [user])

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
                zIndex: 1,
                userSelect: 'none',
            }}
            onCollapse={(value) => setCollapsed(value)}
        >
            <div className="logo" />
            <Menu defaultSelectedKeys={['1']} theme='dark' mode="inline" items={items} />
        </Sider>
    )
};
export default Sidebar;