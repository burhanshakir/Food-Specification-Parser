const { Pool, Client } = require('pg')
var dbconfig = require('../data/dbconfig.js');

const pool = new Pool({
  user: dbconfig.username,
  host: 'localhost',
  database: 'profcal_foodspec',
  password: dbconfig.password,
  port: 5432,
})

module.exports.foodSpecUpload = function(req, res)
{
      console.log('Received your data!');

      // Receiving data from the body

      var name = req.body.name;
      var desc = req.body.description;
      var weight = req.body.weight;
      var ingredients = req.body.ingredients;
      var temperature = req.body.temperature;
      var energy = req.body.energy;
      var fat = req.body.fat;
      var saturates = req.body.saturates;
      var monounsaturates = req.body.monounsaturates;
      var trans_fat = req.body.trans_fat;
      var carbohydrates = req.body.carbohydrates;
      var sugars = req.body.sugars;
      var polyols = req.body.polyols;
      var starch = req.body.starch;
      var fibre = req.body.fibre;
      var protein = req.body.protein;
      var salt = req.body.salt;
      var sodium = req.body.sodium;


      const insertQuery = 'INSERT INTO food_items(name,description,weight,ingredients,temperature,energy,fat,saturates,monounsaturates,trans_fat,carbohydrates,sugars,polyols,starch,fibre,protein,salt,sodium) values($1,$2,$3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13, $14,$15, $16, $17, $18 ) RETURNING *';
      const values = [name,desc,weight,ingredients,temperature,energy,fat,saturates,monounsaturates,trans_fat,carbohydrates,sugars,polyols,starch,fibre,protein,salt,sodium];

      pool.query(insertQuery, values, (err, result) => {
        // console.log(err, result)

        if(err){
          res.status(400)
                  .json({"message" : "Error Receiving Data"});

          console.log("Error in insertion: ", err);

        }
        else {
          res.status(200)
                  .json({"message" : "Received and Stored Data"});

          console.log(result.rows[0]);
        }
        pool.end()
      })
}


module.exports.foodSpecGetAll = function(req, res){

  console.log("Sending you names of foods wee have!");

  const selectQuery = 'SELECT id, name from food_items';

  pool.query(selectQuery)
  .then(result => {

    console.log(result.rows)

    res.status(200)
            .json( {"food_items" : result.rows});

  })
  .catch(e => {
    console.error(e.stack)

    res.status(400)
            .json({"message" : "Error Sending Data"});


  })

}


module.exports.foodSpecGetOne = function(req, res){

  var id = req.params.id;

  const query = {
    // give the query a unique name
    name: 'fetch-food-item',
    text: 'SELECT * FROM food_items WHERE id = $1',
    values: [id]
  }

  pool.query(query)
  .then(result => {

    console.log(result.rows[0])

    res.status(200)
            .json(result.rows[0]);

  })
  .catch(e => {
    console.error(e.stack)

    res.status(400)
            .json({"message" : "Error Sending Data"});


  })



}
