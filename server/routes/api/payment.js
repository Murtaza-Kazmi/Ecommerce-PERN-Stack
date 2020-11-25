const express = require('express');
const app = express();
const router = express.Router();
const cors = require("cors");
const pool = require("../../db");

//middlewared
app.use(cors());
app.use(express.json()); //gives access to req.body to get json data
router.use(express.json());
router.use(cors());

router.get('/', async (req, res) => {
    try {
        const allPayments = await pool.query("SELECT * FROM payments");
        res.json(allPayments.rows);
    } catch (error) {
        console.log('what scene?');
        console.error(error.message);
    }
});

//create
router.post('/', async (req, res) => {
    try {
        console.log(req.body);

        const {
            payment_id
        } = req.body;
        const {
            total
        } = req.body;
        const {
            user_id
        } = req.body;
        const {
            order_id
        } = req.body;

        const newPayment = await pool.query("INSERT INTO payments (payment_id, total, user_id, order_id) VALUES($1, $2, $3, $4)",
            [payment_id, total, user_id, order_id]);
        res.json(newPayment.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//update
router.put('/:id', async (req, res) => {
    try {
        console.log(req.body);

        const {
            id
        } = req.params;
        const {
            total
        } = req.body;
        const {
            user_id
        } = req.body;
        const {
            order_id
        } = req.body;

        const updatePayment = await pool.query("UPDATE payments SET total = $2, user_id = $3, order_id = $4 WHERE payment_id = $1",
            [id, total, user_id, order_id]);

        res.json("user was updated.");
    } catch (error) {
        console.error(error.message);
    }
});

//find by id

router.get("/:id", async (req, res) => {
    try {
        const {
            payment_id
        } = req.params;

        const ourPayment = await pool.query("SELECT * FROM payments where payment_id = $1", [payment_id]);

        res.json(ourPayment.rows);
    } catch (error) {
        console.error(error.message);
    }
});


//delete
router.delete("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const deletePayment = await pool.query('DELETE FROM payments WHERE payment_id = $1', [id]);

        res.json("record deleted");
    } catch (error) {
        console.log(error.message);
    }
})


module.exports = router;
