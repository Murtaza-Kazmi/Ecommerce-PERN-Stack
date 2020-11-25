require('dotenv').config();
const express = require('express');
// const compression = require('compression');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();
// app.use(express.urlencoded({ extended: false }));


app.use(cors());
app.use(express.json());
app.use("/", routes);

app.listen(8000, () => {
	  console.log("Example app listening at http://localhost:8000")
});
