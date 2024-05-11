var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL= http://localhost:3002/orderdetail/
// ==================================================

router.get('/', function(req, res, next) {
    let query = "SELECT orderdetail_id, order_id, product_id, saleprice, qty FROM orderdetail"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('orderdetail/allrecords', {allrecs: result });
 	});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3002/orderdetail/99/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT orderdetail_id, order_id, product_id, saleprice, qty FROM orderdetail WHERE orderdetail_id = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('orderdetail/onerec', {onerec: result[0] });
        } 
    });
});


// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3002/orderdetail/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('orderdetail/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO orderdetail(order_id, product_id, saleprice, qty) VALUES (?, ?, ?, ?)"; 
    
    db.query(insertquery,[req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/orderdetail');
                }
    });
});


// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3002/orderdetail/99/edit 
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT orderdetail_id, order_id, product_id, saleprice, qty FROM orderdetail WHERE orderdetail_id = " + req.params.recordid; 
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('orderdetail/editrec', {onerec: result[0] });
            } 
         });
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE orderdetail SET order_id = ?, product_id = ?, saleprice = ?, qty = ? WHERE orderdetail_id = " + req.body.orderdetail_id; 

	db.query(updatequery,[req.body.order_id, req.body.product_id, req.body.saleprice, req.body.qty],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/orderdetail');
		}
	});
});

// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3002/orderdetail/99/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM orderdetail WHERE orderdetail_id = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/orderdetail');
            } 
         });
    });


module.exports = router;