const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

console.log("at jwtauth");

//register
router.post('/register', validInfo, async (req, res, next) => {
    //console.log(req);
    console.log(req.body);;
    const {
        email,
        fname,
        lname,
        password
    } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);


        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log("salting");

        const newUser = await pool.query(
            "INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [email, fname, lname, bcryptPassword]
        );

        console.log("newUser created");
        //console.log(newUser);

        const jwtToken = jwtGenerator(newUser.rows[0].user_id);
        console.log("jwttoken generated");
        console.log(jwtToken);

        const newCart = await pool.query("INSERT INTO carts (user_id) VALUES ($1)", [newUser.rows[0].user_id])

        return res.status(200).json({
            jwtToken
        });
    } catch (err) {
        console.log("error in jwtauth");
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//login
router.post('/login', validInfo, async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email
        ]);

        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credential");
        }
        console.log("comparing hash");
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );
        console.log("compared hash");

        if (!validPassword) {
            return res.status(401).json("Invalid Credential");
        }

        const jwtToken = jwtGenerator(user.rows[0].user_id);
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        return res.status(200).json({
            jwtToken
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/verify", authorize, (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
