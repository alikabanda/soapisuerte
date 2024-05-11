var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let query = "SELECT product_id, productname, prodimage, description,  package_id, prodcolor, category_id, saleprice, status FROM product WHERE homepage = 1"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}

    let query = "select promotitle, promoimage from promotion where startdate <= current_date() and enddate >= current_date()";

    db.query(query, (err, result2) => {
      if (err)
      {
        console.log(err);
        res.render('error');
      }
      res.render('index', {allrecs: result, promos: result2 }); 
    });
  });
});

module.exports = router;
