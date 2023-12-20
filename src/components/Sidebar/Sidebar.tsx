import {useState} from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Button, Dropdown} from 'antd';
import {Link} from "react-router-dom";
import './Sidebar.scss'

const items: MenuProps['items'] = [
    {
        label: <Link className={'sidebar__link'} to={'/signin'} children={'Sign in'}/>,
        key: '0',
    },
    {
        label: <Link className={'sidebar__link'} to={'/signup'} children={'Sign up'}/>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: <Link className={'sidebar__link'} to={'/order'} children={'Order'}/>,
        key: '3',
    },
    {
        label: <Link className={'sidebar__link'} to={'/createOrderForm'} children={'Create order form'}/>,
        key: '4',
    },
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return  <Dropdown className={'sidebar'} menu={{items}} trigger={['click']}>
        <Button className={'sidebar__button'}
                type="primary"
                onClick={toggleCollapsed}
        >
            {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        </Button>
    </Dropdown>
};
export default Sidebar;