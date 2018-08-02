module.exports.foodSpecUpload = function(req, res)
{
      console.log('Received your data!');

      var name = req.body.name;
      var desc = req.body.description;

      console.log("Name:", name);
      console.log("Description:", desc);

      res.status(200)
              .json({"message" : "Received Data"});


}
