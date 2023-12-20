import { Outlet } from 'react-router-dom';
import Sidebar from "@/components/Sidebar/Sidebar.tsx";

export const Layout = () => {
	return (
		<>
			<main>
				<Sidebar/>
				<Outlet></Outlet>
			</main>
		</>
	);
};
