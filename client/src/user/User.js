import {
	toast
} from "react-toastify";
import React, {
	Fragment,
	useEffect,
	useState
} from "react";
const InputUsers = ({
	setProductsChange
}) => {
	const [email, setName] = useState("");
	const [password, setPassword] = useState("");
	const [fname, setfirstname] = useState("");
	const [lname, setlastname] = useState("");
	const onSubmitForm = async e => {
		e.preventDefault();
		try {
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("jwt_token", localStorage.token);
			const body = {
				email,
				password,
				fname,
				lname
			};
			const response = await fetch("http://localhost:8000/api/user", {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify(body)
			});
			const parseResponse = await response.json();
			console.log(parseResponse);
			setProductsChange(true);
			setName("");
			setPassword("");
			setfirstname("");
			setlastname("");
		} catch (err) {
			console.error(err.message);
		}
	};
	return ( < Fragment > < h1 className = "text-center my-5" > Input User < /h1> < form className = "d-flex"
		onSubmit = {
			onSubmitForm
		} > < input type = "text"
		placeholder = "email"
		className = "form-control"
		value = {
			email
		}
		onChange = {
			e => setName(e.target.value)
		}
		/> < input type = "text"
		placeholder = "password"
		className = "form-control"
		value = {
			password
		}
		onChange = {
			e => setPassword(e.target.value)
		}
		/> < input type = "text"
		placeholder = "first name"
		className = "form-control"
		value = {
			fname
		}
		onChange = {
			e => setfirstname(e.target.value)
		}
		/> < input type = "text"
		placeholder = "last name"
		className = "form-control"
		value = {
			lname
		}
		onChange = {
			e => setlastname(e.target.value)
		}
		/> < button className = "btn btn-success " > Add < /button> < /form> < /Fragment>);
};
const Products = ({
	setAuth
}) => {
	const [name, setName] = useState("");
	const [allProducts, setAllProducts] = useState([]);
	const [productsChange, setProductsChange] = useState(false);
	const getProducts = async () => {
		try {
			const res = await fetch("http://localhost:8000/api/user", {
				method: "GET",
				headers: {
					jwt_token: localStorage.token
				},
			});
			const parseData = await res.json();
			setAllProducts(parseData);
			setName(parseData[0].first_name); // name is the first array item
		} catch (err) {
			console.error(err.message);
		}
	};
	const logout = async (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem("token");
			setAuth(false);
			toast.success("Successfully logged out");
		} catch (err) {
			console.error(err.message);
		}
	};
	useEffect(() => {
		getProducts();
		setProductsChange(false);
	}, [productsChange]);
	return ( < div > < div className = "d-flex mt-5 justify-content-around" > < h2 > Add User < /h2> < button onClick = {
			(e) => logout(e)
		}
		className = "btn btn-primary" > Logout < /button> < /div> < InputUsers setProductsChange = {
			setProductsChange
		}
		/> < /div>);
};
export default Products;
