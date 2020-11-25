import React from 'react';
import {
	BrowserRouter,
	Switch,
	Route
} from 'react-router-dom';
//importing required components
import Signin from './user/Signin';
import Home from './default/home';
import Menu from './default/menu';
import PrivateRoute from './auth/privateRoute'
import Dashboard from './user/userdashboard'
import AdminRoute from './auth/adminRoute'
import AdminDashboard from './user/admindashboard'
import Shopping from './user/shopping';
import ProductPage from '.user/ProductPage';
//BrowserRouter = main wrapper
//Switch = internal wrapper for Routes
const Routes = () => {
	return ( < BrowserRouter > < Menu / > < Switch > < Route path = "/signin"
		exact component = {
			Signin
		}
		/> <
		Route path = "/"
		exact component = {
			products
		}
		/>

		<
		Route path = "/product/:id"
		exact component = {
			ProductPage
		}
		/>

		<
		PrivateRoute path = "/user/dashboard"
		exact component = {
			Dashboard
		}
		/>
		<
		PrivateRoute path = "/user/Shopping"
		exact component = {
			Shopping
		}
		/>
		 <
		AdminRoute path = "/admin/dashboard"
		exact component = {
			AdminDashboard
		}
		/> < / Switch > < /BrowserRouter>);
}
export default Routes;
