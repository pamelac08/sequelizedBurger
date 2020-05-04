var db = require("../models");

module.exports = function (app) {
  app.get("/", function (req, res) {
    db.Burgers.findAll({ 
        include: [db.Customer],
        order: [["burger_name", "ASC"]]
    }).then(function (results) {
      var burgerObj = { burger: results };
      res.render("index", burgerObj);
    });
  });

  app.post("/api/burgers", function (req, res) {
    db.Burgers.create({
      burger_name: req.body.burger,
    }).then(function (results) {
      res.json(results);
    });
  });

  app.put("/api/burgers/:id", function (req, res) {

    console.log("customer: ", req.body.customer);

    db.Customer.findOrCreate({
        where: {
            customer_name: req.body.customer
        }
    }).spread(function(customer){
        customer.get({plain: true});
        db.Burgers.update({
        devoured: true,
        CustomerId: customer.id
      },
      {
        where: {
          id: req.params.id,
        },
      }).then(function (results) {

        // console.log(results);  (result = [1])

      if (results.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
});
};
