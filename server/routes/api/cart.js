const express = require('express');
const app = express();
const router = express.Router();
const cors = require("cors");
const pool = require("../../db");
const authorize = require("../../middleware/authorize")

//middlewared
app.use(cors());
app.use(express.json()); //gives access to req.body to get json data
router.use(express.json());
router.use(cors());


//get cart
router.get('/', authorize, async (req, res) => {


    try {
        const cart_id = await pool.query("SELECT cart_id FROM carts WHERE user_id = $1", [req.user.id]);
        const lineItems = await pool.query("SELECT * FROM lineItems WHERE cart_id = $1", [cart_id.rows[0]]);
        res.json(lineItems.rows);
    } catch (error) {
        console.log('what scene?');
        console.error(error.message);
    }

});

//create
router.post('/', authorize, async (req, res) => {
    try {

        // gets the cart for the user
        const cart_id = await pool.query("SELECT cart_id FROM carts WHERE user_id = $1", [req.user.id]);
        const {
            order_id,
            product_id
        } = req.body;

        //product is inserted into the lineitems using this post call. Lineitems is connected to cart as one to one.
        const lineItem = await pool.query("INSERT INTO lineItems (cart_id, order_id, product_id) VALUES($1, $2, $3)",
            [cart_id.rows[0], order_id, product_id]);

        res.json(lineItem.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//update
router.put('/', authorize, async (req, res) => {
    try {
        console.log(req.body);

        const {
            cart_id
        } = req.body;
        const {
            user_id
        } = req.body;
        const updateCart = await pool.query("UPDATE carts SET user_id = $2 WHERE cart_id = $1",
            [cart_id, user_id]);
        res.json("user was updated.");
    } catch (error) {
        console.error(error.message);
    }
});

//find by id

router.get("/:id", authorize, async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const ourCart = await pool.query("SELECT * FROM carts where cart_id = $1", [id]);
        res.json(ourCart.rows);
    } catch (error) {
        console.error(error.message);
    }
});


//delete
router.delete("/:id", authorize, async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const deleteCart = await pool.query('DELETE FROM carts WHERE cart_id = $1', [id]);
        res.json("record deleted");
    } catch (error) {
        console.log(error.message);
    }
})


module.exports = router;
