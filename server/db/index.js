const Pool = require('pg').Pool;

const pool = new Pool({
	user: "postgres",
	password: "auth",
	host: "localhost",
	port: 5432,
	database: "dbproject9000
});

module.exports = pool;
