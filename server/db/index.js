const { Pool } = require('pg');
const config = require('./config.js');

const pool = new Pool(config);

module.exports = {
  async query(text, params) {
    const res = await pool.query(text, params);
    return res;
  },
};
