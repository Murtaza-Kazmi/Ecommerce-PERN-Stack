import React, {useState} from 'react';
import moment, { updateLocale } from 'moment';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import {addItem, updateItem, removeItem} from './cartHelpers';

const Card = ({
        product,
        showViewProduct = true,
        showAddToCart = true,
        showRemoveProduct = false,
        cartUpdate = false,
        refresh}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(false);
        });
    }

    const shouldRedirect = (redirect) => {
        if (redirect) {
            return(
                <Redirect to='/cart'/>
            );
        }
    }

    const showViewButton = (showViewProduct) => {
        return(
            showViewProduct &&(
                <Link
                    to={`/product/${product.product_id}`}
                    className='mr-2'>
                    <button
                        className='btn btn-outline-primary mt-2 mb-2'>
                            View product
                    </button>
                </Link>
            )
        );
    }

    const showAddToCartButton = (showAddToCart) => {
        return(
            showAddToCart &&(
                <button
                    onClick={() => {
                        addToCart()
                    }}
                    className='btn btn-outline-warning mt-2 mb-2'>
                    Add to cart
                </button>
            )
        );
    }

    const showRemoveProductButton = (showRemoveProduct) => {
        return(
            showRemoveProduct &&(
                <button
                    onClick={() => {
                        removeItem(product.product_id);
                        refresh(true);
                    }}
                    className='btn btn-outline-danger mt-2 mb-2'>
                    Remove
                </button>
            )
        );
    }

    const showStock = (quantity) => {
        let message =
            (quantity > 0) ? `In stock: ${quantity}` : 'Out of stock'

        return quantity > 0 && (
            <span className='badge badge-primary badge-pill'>
                {message}
            </span>
        );
    }

    const showCartUpdateOptions = (cartUpdate) => {
        return cartUpdate && (
            <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        Adjust Quantity
                    </span>
                </div>
                <input
                    type='number'
                    className='form-control'
                    value={count}
                    onChange={handleChange(product.product_id)}>
                </input>
            </div>
        );
    }

    const handleChange = productId => event => {
        let value = event.target.value;

        setCount(value < 1 ? 1 : value);

        if (value >= 1) {
            updateItem(productId, value);
        }
    }

    return(

        <div

        className='card '>
            <div
                className='card-header name'>
                {product.product_name}
            </div>
            <div
                className='card-body'>
                {shouldRedirect(redirect)}
                <ShowImage
                    item={product}
                    url="product"/>
                <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
                <p className='black-10'>
                    $ {product.price}</p>
                <p className='black-9'>
                    Category: {product.category_name}
                </p>
                <p className='black-8'>
                    Added on {moment(product.created_at).fromNow()}
                </p>
                {showStock(product.stockQty)}
                <br/>
                {showViewButton(showViewProduct)}
                {showAddToCartButton(showAddToCart)}
                {showRemoveProductButton(showRemoveProduct)}
                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
}

export default Card;
