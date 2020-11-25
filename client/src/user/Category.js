import {
	toast
} from "react-toastify";
import React, {
	Fragment,
	useEffect,
	useState
} from "react";
const ListCategories = ({
	allCategories,
	setCategoriesChange
}) => {
	console.log(allCategories);
	const [categories, setCategories] = useState([]); //useState to set todos to
	async function addCategory(name) {
		try {
			await fetch("http://localhost:8000/api/category/", {
				method: "POST",
				headers: {
					jwt_token: localStorage.token
				},
				body: JSON.stringify({
					"category_name": name
				})
			});
		} catch (err) {
			console.error(err.message);
		}
	}
	useEffect(() => {
		setCategories(allCategories);
	}, [allCategories]);
	console.log(categories);
	return ( < Fragment > {
			" "
		} < table className = "table mt-5" > < thead > < tr > < th > ID < /th> <
		th > Name < /th> < / tr > < /thead> <
		tbody > {
			categories.length !== 0 && categories[0].category_id !== null && categories.map(category => ( < tr key = {
					category.category_id
				} > < td > {
					category.category_id
				} < /td> <
				td > {
					category.category_name
				} < /td> <
				td > < addCategory category = {
					category
				}
				setCategoriesChange = {
					setCategoriesChange
				}
				/> < / td > < /tr>))
		} < /tbody> < / table > < /Fragment>);
};
const InputCategory = ({
	setCategoryChange
}) => {
	const [category_name, setName] = useState("");
	const onSubmitForm = async e => {
		e.preventDefault();
		try {
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("jwt_token", localStorage.token);
			const body = {
				category_name
			};
			const response = await fetch("http://localhost:8000/api/category", {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify(body)
			});
			const parseResponse = await response.json();
			console.log(parseResponse);
			setCategoryChange(true);
			setName("");
			//      setPrice("");
			//      setCategory("");
		} catch (err) {
			console.error(err.message);
		}
	};
	return ( < Fragment > < h1 className = "text-center my-5" > Input Category < /h1> <
		form className = "d-flex"
		onSubmit = {
			onSubmitForm
		} > < input type = "text"
		placeholder = "name"
		className = "form-control"
		value = {
			category_name
		}
		onChange = {
			e => setName(e.target.value)
		}
		/> <
		button className = "btn btn-success " > Add < /button> < / form > < /Fragment>);
};
const Category = ({
	setAuth
}) => {
	const [category_name, setName] = useState("");
	const [allCategories, setAllCategories] = useState([]);
	const [categoriesChange, setCategoriesChange] = useState(false);
	const getCategories = async () => {
		try {
			const res = await fetch("http://localhost:8000/api/category", {
				method: "GET",
				headers: {
					jwt_token: localStorage.token
				},
			});
			const parseData = await res.json();
			setAllCategories(parseData);
			setName(parseData[0].category_name); // name is the first array item
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
		getCategories();
		setCategoriesChange(false);
	}, [categoriesChange]);
	return ( < div > < div className = "d-flex mt-5 justify-content-around" > < h2 > {
			category_name
		}
		Add Category < /h2> <
		button onClick = {
			(e) => logout(e)
		}
		className = "btn btn-primary" > Logout < /button> < / div > < InputCategory setCategoryChange = {
			setCategoriesChange
		}
		/> <
		ListCategories allCategories = {
			allCategories
		}
		setCategoriesChange = {
			setCategoriesChange
		}
		/> < / div > );
};
export default Category;
