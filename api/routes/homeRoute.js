//Dependencies
let express = require('express');
let router = express.Router();
let db = require('./../models/db');
let model = require('./../models/model');

//Home Route
router.get('/', (req, res) => {
  
  if(req.session.loggedIn){
    var query = 'call homedata()';
    
    db.connector.query(query, (err, success) => {
      //console.log(success);
      res.render('index.ejs', {daily_journal: success[0], journal_entry: success[1]})
    })
  }
  else
    res.redirect('/login')

})

//Login Route
router.get('/login', (req, res) => {
  if(!req.session.loggedIn)
    res.render('login.ejs', {msg: ''});
  else
    res.redirect('/')
})

//Login POST Route
router.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  var query = `select * from user where username='${username}'`;

  db.connector.query(query, (err, success) => {
    if(err)
      res.send(err)
    else{
      if(success.length > 0){
        if(password == success[0].password){
          req.session.loggedIn = success[0].id;
          res.send({err: false, msg: 'Login Successfull'});
        }
        else{
          res.send({err: true, msg: 'Incorrect Password'})
        }
      }else{
        res.send({err: true, msg: 'User doesnot exist!'})
      }
    }
  })
})

//New Transaction route
router.get('/new-transaction', (req, res) => {
  if(req.session.loggedIn)
    res.render('addTransactions.ejs');
  else
    res.redirect('/login')
})

//New Post Transaction route
router.post('/new-transaction', (req, res) => {
  var date = req.body.date;
  var particular = req.body.particular;
  var type = req.body.type;
  var description = req.body.description;
  var name = req.body.name;
  var debit =req.body.debit;
  var credit = req.body.credit;

  var query = `insert into daily_journal(name, particular, description, debit, credit, Date, type)
    values ('${name}', '${particular}', '${description}', '${debit}', '${credit}', '${date}', '${type}')`;

  db.connector.query(query, (err, success) => {

    if(err){
      console.log(err)
      res.send('An Error Occured');
    }else{
      var particular2 = model.getJournalEntryParticular({particular: particular, name: name, type: type})
      var debit2 = debit != 0 ? debit: credit;
      var credit2 = debit != 0 ? debit: credit;
  
      var query2 = `insert into journal_entry(particular, description, debit, credit, date) 
        values('${particular2}', '${description}', ${debit2}, ${credit2}, '${date}')`
  
      db.connector.query(query2, (err, success2) => {
        if(err){
          console.log(err)
          res.send("An error occured")
        }
        else{
          model.updateLedger({date: date, particular: particular2, debit: debit2, credit: credit2}, (err, success) => {
            if(err){
              console.log(err)
              res.send("An error Occured");
            }else
              res.redirect('/');
          });  
        }
      })
    }
  })
})


module.exports = router;