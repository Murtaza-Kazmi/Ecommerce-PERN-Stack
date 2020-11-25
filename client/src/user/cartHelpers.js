export const getLocalStorageItem = (itemName) => {
    let item = [];

    if (typeof window !== 'undefined') {
        if (localStorage.getItem(itemName)) {
            item = JSON.parse(localStorage.getItem(itemName));
        }
    }

    return item;
}

export const setLocalStorageItem = (itemName, object) => {
    let item = JSON.stringify(object);

    localStorage.setItem(itemName, item);
}

export const getCart = () => {
    let cart = getLocalStorageItem('cart');

    return cart ? cart : 'undefined';
}

export const updateItem = (productId, count) => {
    let cart = getCart();

    if (cart) {
        cart.map((p, i) => {
            if (p.product_id === productId) {
                cart[i].count = count;
            }
        });

        setLocalStorageItem('cart', cart);
    }
}

export const addItem = (item, next) => {
    let cart = getCart();

    if (cart) {
        cart.push({...item,
            count: 1
        });

        cart = Array.from(new Set(cart.map((p) => (p.product_id))))
            .map((id) => {
                return cart.find(p => p.product_id === id);
            });

        setLocalStorageItem('cart', cart);

        next();
    }
}

export const itemTotal = () => {
    let cartLength = getCart() ? getCart().length : 0;

    return cartLength;
}

export const removeItem = (productId) => {
    let cart = getCart();

    if (cart) {
        cart.map((p, i) => {
            if (p.product_id === productId) {
                cart.splice(i, 1);
            }
        });

        setLocalStorageItem('cart', cart);
    }

    return cart;
}

export const emptyCart = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem('cart');

        next();
    }
}
