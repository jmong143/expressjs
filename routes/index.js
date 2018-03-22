var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('michaelDB', ['customerapp'])
var ObjectId = mongojs.ObjectId;
/* GET home page. */
router.get('/', function(req, res, next) {
  db.customerapp.find(function(err, customerList){
    res.render('index', { 
      title: 'Customers',
      users: customerList
    });
  });
});

router.post('/users/add', (req, res) => {
  console.log(req.body);
  req.checkBody('first_name', 'First Name is Required').notEmpty();
  req.checkBody('last_name', 'Last Name is Required').notEmpty();
  req.checkBody('email', 'Email is Required').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    res.render('index', { 
      title: 'Customers',
      users: users,
      errors: errors
    });
  }else{
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }
    db.customerapp.insert(newUser, (err, result) => {
      if(err){
        console.log(err);
      }
      res.redirect('/');
    });
    console.log("SUCCESS");
  }
});

router.delete('/users/delete/:id', (req, res) => {
  db.customerapp.remove({_id: ObjectId(req.params.id)}, function(err, result){
    if(err){
      console.log(err)
    }
    res.redirect('/')
  });
});


module.exports = router;
