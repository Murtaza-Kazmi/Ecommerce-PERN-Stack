const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const pool = require('../../db');
const authorize = require('../../middleware/authorize');
const bcrypt = require("bcrypt");

//middlewared
app.use(cors());
app.use(express.json()); //gives access to req.body to get json data
router.use(express.json());
router.use(cors());



router.get('/', authorize, async (req, res) => {

    try {
        const user_id = req.user.id;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);

        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
        res.json({
            error: error.message
        });
    }

});

//create a user
router.post('/', async (req, res) => {
    try {
        const {
            email,
            fname,
            lname,
            password
        } = req.body;

        // Fetch user to test if already exists
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);

        // check if already exists
        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }

        // bcrypt to geenrate hash using salt strength 10
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // SQL Query
        const newUser = await pool.query(
            "INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [email, fname, lname, bcryptPassword]
        );

        // generate token
        const jwtToken = jwtGenerator(newUser.rows[0].user_id);

        // Add cart for user in carts table
        const newCart = await pool.query("INSERT INTO carts (user_id) VALUES ($1)", [newUser.rows[0].user_id])

        return res.status(200).json({
            jwtToken
        });
    } catch (error) {
        console.error(error.message);
    }
});

//update a user
router.put('/:user_id', async (req, res) => {
    try {
        console.log(req.body);

        const {
            user_id
        } = req.params;
        const {
            username
        } = req.body;
        const {
            first_name
        } = req.body;
        const {
            last_name
        } = req.body;
        const {
            password
        } = req.body;
        const {
            email
        } = req.body;
        const {
            address
        } = req.body;

        const passwordHash = User.generatePasswordHash(password);

        console.log("updating user");

        const updateUsers = await pool.query(
            "UPDATE users SET username = $1, password_hash = $2, first_name = $3, last_name = $4, email = $5, address = $6 WHERE user_id = $7",
            [username, passwordHash, first_name, last_name, email, address, user_id]
        );

        res.json("user was updated.");
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
        const ourUser = await pool.query("SELECT * FROM users where user_id = $1", [id]);
        res.json(ourUser.rows);
    } catch (error) {
        console.error(error.message);
    }
});


//delete a user
router.delete("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const deleteUser = await pool.query('DELETE FROM users WHERE user_id = $1', [id]);

        res.json("record deleted");
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;
