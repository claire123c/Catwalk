const { Pool } = require('pg');
const { host, user, database, password, port } = require('../config.js');

const pool = new Pool({
    host,
    user,
    database,
    password,
    port,
}, (err, res) => {
    if (err) {
        console.log(err);
    }
});

module.exports = pool;
