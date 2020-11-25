import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    // const [error, setError] = useState(false);


    // returns all products in JSON with respect to sortBy functionality.
    const getProducts = async (sortBy) => {
      try {
        const res = await fetch(`http://localhost:8000/api/product/sortBy/${sortBy}`, {
          method: "GET" // don't need auth for this
        });

        return res.json();
      } catch (err) {
        console.error(err.message);
      }
    };

    const loadProductsSortedBy = async (sortBy) => {
      try {
        const data = await getProducts(sortBy);
            if (sortBy == 'soldQty') {
                setProductsBySell(data);
            } else {
                setProductsByArrival(data);
              }
            }
            catch (err) {
              console.error(err.message);
            }
    }

    useEffect(() => {
        loadProductsSortedBy('created_at');
        loadProductsSortedBy('soldQty');

    }, []);

    return(
        <Layout
            title='Home Page'
            description='E-commerce Web App'
            className='container-fluid'>

            <h2 className='mb-4'>
                New arrivals
            </h2>

            <div className='row'>
                {
                  productsByArrival.map((product, i) => {
                    return(
                        <div
                            key={i}
                            className='col-4 mb-3'>
                            <Card  product={product}/>
                        </div>
                    )
                })
              }
            </div>
            <h2 className='mb-4'>
                Best Sellers
            </h2>
            <div className='row'>
                {productsBySell.map((product, i) => {
                    return(
                        <div
                            key={i}
                            className='col-4 mb-3'>
                            <Card  product={product}/>
                        </div>
                    )
                })}
            </div>
        </Layout>
    );
};

export default Home;
