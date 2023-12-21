import { useState } from 'react';
import { Link } from "react-router-dom";
import './Sidebar.scss';

interface SidebarItem {
    id: number;
    title: string;
    link: string;
    icon: string; // Добавляем поле для иконки
}

const sidebarItems: SidebarItem[] = [
    { id: 1, title: 'Sign in', link: '/signin', icon: '🔑' },
    { id: 2, title: 'Sign up', link: '/signup', icon: '📝' },
    { id: 3, title: 'Order List', link: '/order', icon: '📦' },
    { id: 4, title: 'Create Order Form', link: '/createOrderForm', icon: '🖊️' },
    { id: 5, title: 'User List', link: '/user', icon: '👥' },
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar__button" onClick={toggleCollapsed}>
                ---
            </div>
            <ul className="sidebar__list">
                {sidebarItems.map(item => (
                    <li key={item.id} className="sidebar__item">
                        <Link to={item.link} className="sidebar__link">
                            <span className="sidebar__icon">{item.icon}</span>
                            {!collapsed && <span className="sidebar__title">{item.title}</span>}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
