var dbconfig = require('data/dbconfig');

const { Pool, Client } = require('pg')

const createTableQuery = 'CREATE TABLE food_items(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, description VARCHAR(40), weight VARCHAR(40), ingredients VARCHAR(40), temperature VARCHAR(40), energy VARCHAR(40), fat VARCHAR(40), saturates VARCHAR(40), monounsaturates VARCHAR(40), trans_fat VARCHAR(40), carbohydrates VARCHAR(40), sugars VARCHAR(40), polyols VARCHAR(40), starch VARCHAR(40), fibre VARCHAR(40), protein VARCHAR(40), salt VARCHAR(40), sodium VARCHAR(40))';

const pool = new Pool({
  user: dbconfig.username,
  host: 'localhost',
  database: 'profcal_foodspec',
  password: dbconfig.password,
  port: 5432,
})

pool.query(createTableQuery, (err, res) => {
  console.log(err, res)
  pool.end()
})
