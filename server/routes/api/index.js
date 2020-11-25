const router = require('express').Router();

// user route
const userRoutes = require('./user');
router.use("/user", userRoutes);

// auth route
//const authRoutes = require('./auth');
//router.use('/auth', authRoutes);

// product route
const productRoutes = require('./product');
router.use('/product', productRoutes);

// category route
const categoryRoutes = require('./category');
router.use('/category', categoryRoutes);

// cart route
const cartRoutes = require('./cart');
router.use('/cart', cartRoutes);

// order route
const orderRoutes = require('./order');
router.use('/order', orderRoutes);

// lineitems route
const lineItemsRoutes = require('./lineItems');
router.use('/lineItems', lineItemsRoutes);

// payment route
const paymentRoutes = require('./payment');
router.use('/payment', paymentRoutes);

module.exports = router;
