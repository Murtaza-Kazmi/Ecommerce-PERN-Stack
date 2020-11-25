import { toast } from "react-toastify";


import React, { Fragment, useEffect, useState } from "react";

const Products = ({ setAuth }) => {
    // setAuth is sent by Routes as boolean

  const [name, setName] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [productsChange, setProductsChange] = useState(false);

  // return all products in JSON and sets in state using setAllProducts()
  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/product/", {
        method: "GET" // don't need auth for this
      });

      const parseData = await res.json();

      setAllProducts(parseData);

      // sets the state "name" from JSON response
      setName(parseData[0].product_name); // name is the first array item
    } catch (err) {
      console.error(err.message);
    }
  };

  // removes token from local storage to logout
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

  // sets states after sending request
  useEffect(() => {
    getProducts();
    setProductsChange(false);
  }, [productsChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>Add product</h2>
        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>

      // components above
      <InputProducts setProductsChange={setProductsChange} />
      <ListProducts allProducts={allProducts} setProductsChange={setProductsChange} />

    </div>
  );
};

// Get table for product list with add to cart
const ListProducts = ({ allProducts, setProductsChange }) => {
  console.log(allProducts);
  const [products, setProducts] = useState([]); //useState to set todos to

    // POSTs to the cart API and sends the product id
  async function addProduct(id) {
    try {
      	await fetch("http://localhost:8000/api/cart/", {
        method: "POST",
        headers: { jwt_token: localStorage.token }, // token is stored in browser after login
		body: JSON.stringify( {
            "product_id": id
        })
      });

    } catch (err) {
      console.error(err.message);
    }
  }

  // changes state when a request is sent
  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  console.log(products);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
            {products.length !== 0 &&
                    products[0].product_id !== null &&
                    products.map(product => (
                        <tr key={product.product_id}>
                            <td>{product.product_name}</td>
                            <td>{product.price}</td>
                            <td>{product.category_id}</td>
                            <td>
                                <addProduct product={product} setProductsChange={setProductsChange} />
                            </td>
                            <td>
                                <button
                                className="btn btn-danger"
                                onClick={() => addProduct(product.product_id)}
                                >
                                    Add to Cart
                                </button>

                            </td>

                        </tr>
                    ))

            }
        </tbody>
      </table>
    </Fragment>
  );
};

// sub-component - takes product name, price, category from the form and sends to API
const InputProducts = ({ setProductsChange }) => {

  // data taken from HTML form
  const [product_name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category_id, setCategory] = useState("");

  // "e" is the event that triggers this
  const onSubmitForm = async e => {
    e.preventDefault(); // default behavior after submitting a form is to redirect. this prevents it
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token); // auth needed. fetch token from browser
      // token is stored in browser after login

      const body = { product_name, price, category_id };

      const response = await fetch("http://localhost:8000/api/product", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      // this gets the json object containing response
      const parseResponse = await response.json();

      setProductsChange(true);

      // set form state empty after submitting
      setName("");
      setPrice("");
      setCategory("");

    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Input Product</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="name"
          className="form-control"
          value={product_name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="price"
          className="form-control"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="category"
          className="form-control"
          value={category_id}
          onChange={e => setCategory(e.target.value)}
        />
        <button className="btn btn-success ">Add</button>
      </form>
    </Fragment>
  );
};


export default Products;
