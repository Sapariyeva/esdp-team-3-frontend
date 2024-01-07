import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Button } from 'antd';
import Sidebar from '@/components/Sidebar/Sidebar';

declare global {
	interface Window {
		ymaps: any;
	}
}

export const CustomLayout = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleCreateOrderClick = () => {
		navigate('/createOrderForm');
	};

	useEffect(() => {
		if (location.pathname === '/') {
			window.ymaps.ready(() => {
				new window.ymaps.Map('map', {
					center: [43.238949, 76.889709],
					zoom: 10,
					controls: []
				});
			});
		}
	}, [location.pathname]);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sidebar />
			<Layout>
				{location.pathname === '/' && (
					<div id="map" style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}></div>
				)}
				<Outlet />
				{location.pathname === '/' && (
					<Button
						type="primary"
						style={{
							position: 'fixed',
							bottom: 20,
							left: '50%',
							transform: 'translateX(-50%)',
							height: '54px',
							zIndex: 1
						}}
						onClick={handleCreateOrderClick}
					>
						Создать заказ
					</Button>
				)}
			</Layout>
		</Layout>
	);
};
