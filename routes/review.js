var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// URL= http://localhost:3002/review/
// ==================================================

router.get('/', function(req, res, next) {
    let query = "SELECT review_id, customer_id, product_id, reviewdate, rating, status FROM review"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('review/allrecords', {allrecs: result });
 	});
});

router.post('/submit', function(req, res, next){

    var prod_id = req.body.product_id;
    if (req.session.customer_id)
        {
            res.render('review/submit', {prod_id : prod_id, cust_id : req.session.customer_id});

        } else {
            res.render('customer/login', {message: "Please Login First"});
        }

});


// ==================================================
// Route to view one specific record. Notice the view is one record
// URL: http://localhost:3002/review/99/show
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT review_id, customer_id, product_id, reviewdate, comments, rating, status FROM review WHERE review_id = " + req.params.recordid; 
    
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('review/onerec', {onerec: result[0] });
        } 
    });
});


// ==================================================
// Route to show empty form to obtain input form end-user.
// URL: http://localhost:3002/review/addrecord
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('review/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

    let insertquery = "INSERT INTO review(customer_id, product_id, comments, reviewdate, rating, status) VALUES (?, ?, ?, now(), ?, 'Review')"; 
    
    db.query(insertquery,[req.body.customer_id, req.body.product_id, req.body.comments, req.body.rating],(err, result) => {
        if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/');
                }
    });
});


// ==================================================
// Route to edit one specific record.
// URL: http://localhost:3002/review/99/edit 
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT review_id, customer_id, product_id, reviewdate, comments, rating, status FROM review WHERE review_id = " + req.params.recordid; 
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.render('review/editrec', {onerec: result[0] });
            } 
         });
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE review SET customer_id = ?, product_id = ?, reviewdate = ?, comments = ?, rating = ?, status = ? WHERE review_id = " + req.body.review_id; 

	db.query(updatequery,[req.body.customer_id, req.body.product_id, req.body.reviewdate, req.body.rating, req.body.status],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/review');
		}
	});
});

// ==================================================
// Route to delete one specific record.
// URL: http://localhost:3002/review/99/delete
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM review WHERE review_id = " + req.params.recordid;  
    
      // execute query
      db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/review');
            } 
         });
    });
    



module.exports = router;