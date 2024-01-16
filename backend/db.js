const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '2634',
    host: 'localhost',
    port: 5432,
    database: 'hungaryhustle'
});

module.exports = pool;