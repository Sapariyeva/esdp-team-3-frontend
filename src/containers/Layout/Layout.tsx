import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header.tsx';

export const Layout = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet></Outlet>
			</main>
		</>
	);
};
