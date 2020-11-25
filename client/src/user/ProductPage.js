import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import Card from './Card';

const ProductPage = (props) => {
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const product_id = props.match.params.product_id;
        loadSingleProduct(product_id);
    }, [props]);


const read =  (product_id) => {
    return(
       fetch(`http://localhost:8000/api/product/${product_id}`, {
      method: "GET"
        })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        })
    );
}

const loadSingleProduct =  (product_id) => {
         read(product_id)
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data.product);
            }
        });
    }
    console.log(product);
    return(
        <Layout
            title={product.first_name}
            description={product.description
                && product.description.substring(0, 100)}
            className='container-fluid'>
            <div className='row'>
                {product.description}
            </div>
        </Layout>
    );
}

export default ProductPage;
