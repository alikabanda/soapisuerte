var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  let query = "SELECT product_id, productname, prodimage, description,  package_id, prodcolor, category_id, saleprice, status FROM product WHERE description LIKE '%" + req.query.searchcriteria + "%' OR productname LIKE '%" + req.query.searchcriteria + "%'"; 

  console.log("\n\n\n Here is the Search SQL Statment: \n\n" + query + "\n\n\n")

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
  res.render('search', {allrecs: result }); 
  });

});

module.exports = router;
