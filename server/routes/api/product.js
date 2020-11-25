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

router.get('/sortBy/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const allProducts = await pool.query("SELECT * FROM products ORDER BY $1 DESC LIMIT 6", [id]);
        res.json(allProducts.rows);
    } catch (error) {
        console.log('what scene?');
        console.error(error.message);
    }
});


router.get('/by-category/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const allProducts = await pool.query("SELECT * FROM getProductsByCategory($1)", [id]);
        res.json(allProducts.rows);
    } catch (error) {
        console.log('what scene?');
        console.error(error.message);
    }
});

//get all
router.get('/', async (req, res) => {
    try {
        const allProducts = await pool.query("SELECT * FROM getProducts()");
        res.json(allProducts.rows);
    } catch (error) {
        console.log('what scene?');
        console.error(error.message);
    }
});

//create
router.post('/', async (req, res) => {
    try {
        // a json object having userid, name, address and email would be sent
        console.log(req.body);

        const {
            product_name
        } = req.body;
        const {
            price
        } = req.body;
        const {
            category_id
        } = req.body;

        const newProduct = await pool.query("INSERT INTO products (product_name, price, category_id) VALUES($1, $2, $3)",
            [product_name, price, category_id]);

        res.json(newProduct.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//update
router.put('/:id', async (req, res) => {
    try {
        // a json object having userid, name, address and email would be sent
        console.log(req.body);

        const {
            id
        } = req.params;
        const {
            category_id
        } = req.body;
        const {
            price
        } = req.body;
        const {
            product_name
        } = req.body;

        const updateProduct = await pool.query("UPDATE products SET product_name = $2, price = $3, category_id = $4 WHERE product_id = $1",
            [id, product_name, price, category_id]);

        res.json("product was updated.");
    } catch (error) {
        console.error(error.message);
    }
});

//find by id

router.get("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const product = await pool.query("SELECT * FROM products where product_id = $1", [id]);

        res.json(product.rows);

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

        const deleteProduct = await pool.query('DELETE FROM products WHERE product_id = $1', [id]);

        res.json("product deleted");
    } catch (error) {
        console.log(error.message);
    }
})


module.exports = router;
