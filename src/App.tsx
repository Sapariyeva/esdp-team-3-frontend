import './assets/styles/normalize.scss';
import './assets/styles/reser.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/containers/Layout/Layout.tsx';
import { SignUp } from '@/containers/Authorization/SignUp.tsx';
import { SignIn } from '@/containers/Authorization/SignIn.tsx';
import { ErrorPage } from '@/containers/ErrorPage/ErrorPage.tsx';
import CreateOrderForm from './containers/OrderCreate/CreateOrderForm';
import { Orders } from '@/containers/Orders/Orders.tsx';
import UsersPageContainer from './containers/Users/UsersPage';

export const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={'/'} element={<Layout />}>
						<Route path={'/signUp'} element={<SignUp />}></Route>
						<Route path={'/signIn'} element={<SignIn />}></Route>
						<Route path={'/order'} element={<Orders />}></Route>
						<Route path={'/*'} element={<ErrorPage />}></Route>
						<Route path={'/user'} element={<UsersPageContainer />}></Route>
						<Route path={'/createOrderForm'} element={<CreateOrderForm />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};
