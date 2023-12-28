import './assets/styles/normalize.scss';
import './assets/styles/reset.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CustomLayout } from '@/containers/Layout/CustomLayout';
import { SignUp } from '@/containers/Authorization/SignUp.tsx';
import { SignIn } from '@/containers/Authorization/SignIn.tsx';
import { ErrorPage } from '@/containers/ErrorPage/ErrorPage.tsx';
import CreateOrderForm from './containers/OrderCreate/CreateOrderForm';
import { Orders } from '@/containers/Orders/Orders.tsx';
import { OrderDetails } from '@/containers/Orders/OrderDetails.tsx';
import UsersPageContainer from './containers/Users/UsersPage';
import UserDetail from './components/UserList/UserDetail';
import CreateUserForm from './components/UserList/CreateUserForm';

export const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={'/'} element={<CustomLayout />}>
						<Route path={'/signUp'} element={<SignUp />}></Route>
						<Route path={'/signIn'} element={<SignIn />}></Route>
						<Route path={'/order'} element={<Orders />}></Route>
						<Route path={'/order'} element={<Orders />}></Route>
						<Route
							path={'/order/:filter'}
							element={<Orders />}
						></Route>
						<Route
							path={'/order/details/:id'}
							element={<OrderDetails />}
						></Route>
						<Route path={'/*'} element={<ErrorPage />}></Route>

						<Route path={'/user'} element={<UsersPageContainer />}></Route>
						<Route path={'/user/:id'} element={<UserDetail />}></Route>
						<Route path={'/createUserForm'} element={<CreateUserForm />}></Route>
						<Route path={'/createOrderForm'} element={<CreateOrderForm />}>

						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};
