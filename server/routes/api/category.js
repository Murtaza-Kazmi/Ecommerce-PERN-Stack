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
//router.use(cors());


//get all
router.get('/', authorize, async (req, res) => {

    try {
        const allCategories = await pool.query("SELECT * FROM categories");
        res.status(200).json(allCategories.rows);
    } catch (error) {
        console.error(error.message);
    }

});

//create
router.post('/', authorize, async (req, res) => {
    try {
        const {
            category_name
        } = req.body;

        const newCategory = await pool.query("INSERT INTO categories (category_name) VALUES($1)",
            [category_name]);
        res.status(200).json(newCategory.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//update
router.put('/', authorize, async (req, res) => {
    try {
        const {
            category_name,
            category_id
        } = req.body;

        const updateCategory = await pool.query("UPDATE categories SET category_name = $2 WHERE category_id = $1",
            [category_id, category_name]);

        res.status(200).json("user was updated.");
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

        const products = await pool.query("SELECT * FROM products WHERE category_id = $1", [id]);

        res.json(products.rows);
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
        const deleteCategory = await pool.query('DELETE FROM categories WHERE category_id = $1', [id]);
        res.json("record deleted");
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router;
