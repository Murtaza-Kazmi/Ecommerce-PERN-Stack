import React, {
	Fragment,
	useEffect,
	useState
} from "react";
import {
	Redirect
} from "react-router-dom";
import {
	toast
} from "react-toastify";
import Layout from '../core/Layout';
// component - takes setAuth from App.js (using authentication functions) and logs in using API
const Signin = ({
	setAuth
}) => {
	// inputs from the HTML form
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		loading: false,
		error : ''
	});
	const {
		email,
		password,
		loading,
		error
	} = inputs;
	const onChange = e => setInputs({
		...inputs,
		[e.target.name]: e.target.value
	});

	const showLoading = () => {
         if (loading) {
             return (
                 <div
                     className='alert alert-info'>
                         <h2>Loading...</h2>
                 </div>
             );
         }
     }

		 const showError = () => {
			 return(
					 <div
							 className='alert alert-danger'
							 style={{display: error ? '' : 'none'}}>
									 {error}
					 </div>
			 );
	 }

	// "e" is the event that triggers this.
	const onSubmitForm = async e => {
		// default hTML behavior is to redirect after submitting a form. this prevents it
		e.preventDefault();
		try {
			const body = {
				email,
				password
			};
			const response = await fetch("http://localhost:8000/authentication/login", {
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
				toast.success("Logged in Successfully");
				loading = true;
			} else {
				setAuth(false);
				toast.error('parseRes error: ', parseRes);
				error = toast.error;
			}
		} catch (err) {
			console.error(err.message);
		}
	};
	const signinForm = () => {
		return ( < Fragment > < h1 className = "mt-5 text-center" > Winter sale is on!< /h1> < form onSubmit = {
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
			className = "form-control my-3" / > < button className = "btn btn-success btn-block" > Submit < /button> < /form> < /Fragment>);
	};

	return(
        <Layout
            title='Signin'
            description='Signin to MJM PERN Stack E-Commerce App'
            className='container col-md-8 offset-mde-2'>
            {showLoading()}
            {showError()}
            {signinForm()}
        </Layout>
    );

};
export default Signin;
