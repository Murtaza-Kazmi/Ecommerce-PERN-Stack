const express = require('express');
const app = express();
const router = express.Router();
const cors = require("cors");
const pool = require("../../db");
const authorize = require("../../middleware/authorize");

//middlewared
app.use(cors());
app.use(express.json()); //gives access to req.body to get json data
router.use(express.json());
router.use(cors());

// fetch all orders api
router.get('/', authorize, async (req, res) => {
    try {

        const user = req.user.id;
        const orders = await pool.query("SELECT * FROM orders WHERE user_id = $1",
            [user]
        )
        res.status(200).json(orders.rows);
    } catch (error) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
});

//create
router.post('/', authorize, async (req, res) => {
    try {

        const user = req.user.id;

        console.log("adding order");
        const newOrder = await pool.query("INSERT INTO orders (created_date, user_id) VALUES(current_date, $1) RETURNING *",
            [user]);

        res.json(newOrder.rows);
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
        const order_user_id = await pool.query("SELECT * FROM users WHERE user_id = $1", [req.user.id]);

        if (order_user_id != req.user.id) {

        }

        const order = await pool.query("SELECT * FROM lineItems WHERE order_id = $1", [id]);

        res.json(order.rows);
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

        // TODO: test if the order belongs to the user
        const deleteOrder = await pool.query('DELETE FROM orders WHERE order_id = $1', [id]);

        res.json("record deleted");
    } catch (error) {
        console.log(error.message);
    }
})


module.exports = router;
