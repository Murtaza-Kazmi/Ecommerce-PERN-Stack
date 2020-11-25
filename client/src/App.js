import React, {
	Fragment,
	useState,
	useEffect
} from "react";
//taking required imports
import "react-toastify/dist/ReactToastify.css";
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
//all components to be rendered:
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Products from "./user/Product";
import Category from "./user/Category";
import User from "./user/User";
import Dashboard from "./user/dashboard";
import Shopping from "./user/Shopping";
import Home from "./user/Home";
import ProductPage from "./user/ProductPage";
import {
	toast
} from "react-toastify";
toast.configure();

function App() {
	//checks authentication through localStorage
	//if authenticared,
	const checkAuthenticated = async () => {
		try {
			const res = await fetch("http://localhost:8000/user/authentication/verify", {
				method: "POST",
				headers: {
					jwt_token: localStorage.token
				}
			});
			const parseRes = await res.json();
			console.log(parseRes);
			parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
		} //try end, show error
		catch (err) {
			console.error('checkAuthenticated error: ', err.message);
		}
	};
	useEffect(() => {
		checkAuthenticated();
	}, []);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	//hook to store and check authentication info
	//this is sent to all other components to determine authentication
	const setAuth = boolean => {
		setIsAuthenticated(boolean);
	};
	//react components for different paths
	//authentication is checked in all
	return ( < Fragment > < Router > < div className = "container" > < Switch > < Route exact path = "/login"
		render = {
			props => !isAuthenticated ? ( < Signin {
					...props
				}
				setAuth = {
					setAuth
				}
				/>) : ( < Redirect to = "/home" / > )
		}
		/> <
		Route exact path = "/register"
		render = {
			props => !isAuthenticated ? ( < Signup {
					...props
				}
				setAuth = {
					setAuth
				}
				/>) : ( < Redirect to = "/" / > )
		}
		/>

		<
		Route path = "/product/:id"
		render = {
			props => isAuthenticated ? ( < ProductPage {
					...props
				}
				setAuth = {
					setAuth
				}
				/>) : ( < Redirect to = "/" / > )
		}
		/>
		<
		Route exact path = "/Product"
		render = {
			props => isAuthenticated ? ( < Products {
					...props
				}
				setAuth = {
					setAuth
				}
				/>) : ( < Redirect to = "/" / > )
		}
		/> <
		Route exact path = "/Category"
		render = {
			props => isAuthenticated ? ( < Category {
					...props
				}
				setAuth = {
					setAuth
				}
				/>) : ( < Redirect to = "/" / > )
		}
		/> <
		Route exact path = "/User"
		render = {
			props => isAuthenticated ? ( < User {
					...props
				}
				setAuth = {
					setAuth
				}
				/>) : ( < Redirect to = "/" / > )
		}
		/> <
		Route exact path = "/dashboard"
		render = {
			props => isAuthenticated ? ( < Dashboard {
					...props
				}
				setAuth = {
					setAuth
				}
				/>) : ( < Redirect to = "/login" / > )
		}
		/>
		<
		Route exact path = "/shopping"
		render = {
			props => isAuthenticated ? ( < Shopping {
					...props
				}
				setAuth = {
					setAuth
				}
				/>) : ( < Redirect to = "/login" / > )
		}
		/>
		<
		Route exact path = "/home"
		render = {
			props => isAuthenticated ? ( < Home {
					...props
				}
				setAuth = {
					setAuth
				}
				/>) : ( < Redirect to = "/login" / > )
		}
		/>
		 <
		Route exact path = "/"
		render = {
			props => isAuthenticated ? ( < Home {
					...props
				}
				setAuth = {
					setAuth
				}
				/>) : ( < Redirect to = "/login" / > )
		}
		/> < / Switch > < /div> < / Router > < /Fragment>);
}
export default App;
