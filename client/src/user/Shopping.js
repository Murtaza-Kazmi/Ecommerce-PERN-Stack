import { toast } from "react-toastify";
import React, { Fragment, useEffect, useState } from "react";

const Shopping = ({ setAuth }) => {
  // setAuth is sent by Routes as boolean

  const [allProducts, setAllProducts] = useState([]);
  const [productsChange, setProductsChange] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
  getProducts(categoryName);
}, [categoryName]
);
  const getCategories = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/category", {
        method: "GET" // don't need auth for this
      });

      const parseData = await res.json();

      setAllCategories(parseData);

    } catch (err) {
      console.error(err.message);
    }
  }

  // return all products in JSON and sets in state using setAllProducts()
  const getProducts = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/product/by-category/${id}` , {
        method: "GET" // don't need auth for this
      });

      const parseData = await res.json();

      setAllProducts(parseData);

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
    getProducts(categoryName);
    setProductsChange(false);
  }, [productsChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>Shopping</h2>
        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>

      <select name="cars" id="cars" value={categoryName} onChange={e => setCategoryName(e.target.value)} >
        <option value= "1" >Rock</option>
        <option value="2">Education</option>
        <option value="3">Entertainment</option>
      </select>

      <ListProducts allProducts={allProducts} setProductsChange={setProductsChange} />

    </div>
  );
};

const ListProducts = ({ allCategories, allProducts, setProductsChange }) => {
  console.log(allProducts);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(1);


  // POSTs to the cart API and sends the product id
  async function addToCart(id) {
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
    setCategory(allCategories);
  }, [allProducts, allCategories]);

  console.log(products);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
						<th>Stock Qty</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
            {products.length !== 0 &&
                    products[0].product_id !== null &&
                    products.map(product => (
                        <tr key={product.product_id}>
                            <td>{product.product_name}</td>
                            <td>{product.category_name}</td>
                            <td>{product.price}</td>
                            <td> {product.stockqty}</td>
                            <td> {product.description}</td>

                            <td>
                                <addToCart product={product} setProductsChange={setProductsChange} />
                            </td>
                            <td>
                                <button
                                className="btn btn-danger"
                                onClick={() => addToCart(product.product_id)}
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


export default Shopping;
