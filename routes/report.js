var express = require('express');
var router = express.Router();

function adminonly(req,res,next){ 
	if (!req.session.isadmin) 
		{return res.render('customer/login', {message: "Restricted Area - Need Admin Privs"});}
    next();
}

// Display reports menu
// URL: http://localhost:3025/report

router.get('/', adminonly,  function(req, res, next) {
    res.render('report/reportmenu');
});


// Customer Listing
// URL: http://localhost:3025/report/custlist

router.get('/custlist', adminonly,  function(req, res, next) {
    let query = "SELECT customer_id, firstname, lastname, city, state, username FROM customer"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('report/custlist', {allrecs: result });
 	});
});


// Product Listing
// URL: http://localhost:3025/report/prodlist

router.get('/prodlist', adminonly,  function(req, res, next) {
    let query = "SELECT product_id, productname, package_id, prodcolor, category_id, saleprice, status, homepage FROM product"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('report/prodlist', {allrecs: result });
 	});
});


// Sale Listing
// URL: http://localhost:3025/report/salelist

router.get('/salelist', adminonly,  function(req, res, next) {
	let query = "SELECT order_id, customer_id, saledate, paymentstatus FROM saleorder"; 
	
	  // execute query
	  db.query(query, (err, result) => {
			if (err) {
				console.log(err);
				res.render('error');
			}
		res.render('report/salelist', {allrecs: result });
		 });
	});
module.exports = router;