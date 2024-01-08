import React from 'react';
import { LeftOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';


interface HeaderProps {
    link?: string;  // Ссылка для кнопки "Вперед" 
    title: string; // Название страницы, которое будет отображаться в заголовке
}


export const UserListHeader: React.FC<HeaderProps> = ({ link, title }) => {
    const navigate = useNavigate();

    const goNext = () => {
        if (link) {
            navigate(link);
        }
    };

    const goBack = () => {
        navigate(-1); 
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px' }}>
            {/* Кнопка Назад */}
            <Button
                type="text"
                icon={<LeftOutlined />}
                onClick={goBack}
            />

            {/* Заголовок страницы */}
            <Typography.Title level={4} style={{ margin: '0' }}>
                {title}
            </Typography.Title>

            {/* Кнопка добавления (плюсик), которая отображается только если есть ссылка */}
            {link ? (
                <Button
                    type="text"
                    icon={<PlusCircleOutlined />}
                    onClick={goNext}
                />
            ) : (
                <Button
                    type="text"
                    icon={<PlusCircleOutlined />}
                    style={{ visibility: 'hidden' }}
                />
            )}
        </div>
    );
};