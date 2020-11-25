import React, {
	Fragment,
	useState
} from "react";
import {
	toast
} from "react-toastify";
// component - takes setAuth from App.js (using authentication functions) and signs up using API
const Signup = ({
	setAuth
}) => {
	// inputs from HTMl form
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		fname: "",
		lname: "",
	});
	const {
		email,
		password,
		fname,
		lname
	} = inputs;
	const onChange = e => setInputs({
		...inputs,
		[e.target.name]: e.target.value
	});
	const onSubmitForm = async e => {
		e.preventDefault();
		try {
			const body = {
				email,
				password,
				fname,
				lname
			};
			const response = await fetch("http://localhost:8000/authentication/register", {
				method: "POST",
				headers: {
					"Access-Control-Allow-Methods": "POST, OPTIONS",
					"Content-type": "application/json"
				},
				body: JSON.stringify(body)
			});
			// contains response containing JWT Token from API
			const parseRes = await response.json();
			if(parseRes.jwtToken) {
				// saves the JWT token in the browser's local storage
				localStorage.setItem("token", parseRes.jwtToken);
				// setAuth() is the boolean that's sent to every other component to determine auth
				setAuth(true);
				toast.success("Registered Successfully");
			} else {
				setAuth(false);
				toast.error('parseRes error: ', parseRes);
			}
		} catch (err) {
			console.error('onSubmit form error: ', err.message);
		}
	};
	return ( < Fragment > < h1 className = "mt-5 text-center" > Register < /h1> < form onSubmit = {
			onSubmitForm
		} > < input type = "text"
		name = "email"
		value = {
			email
		}
		placeholder = "email"
		onChange = {
			e => onChange(e)
		}
		className = "form-control my-3" / > < input type = "password"
		name = "password"
		value = {
			password
		}
		placeholder = "password"
		onChange = {
			e => onChange(e)
		}
		className = "form-control my-3" / > < input type = "text"
		name = "fname"
		value = {
			fname
		}
		placeholder = "firstname"
		onChange = {
			e => onChange(e)
		}
		className = "form-control my-3" / > < input type = "text"
		name = "lname"
		value = {
			lname
		}
		placeholder = "lastname"
		onChange = {
			e => onChange(e)
		}
		className = "form-control my-3" / > < button className = "btn btn-success btn-block" > Submit < /button> < /form> < /Fragment>);
};
export default Signup;
