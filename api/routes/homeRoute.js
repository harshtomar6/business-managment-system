//Dependencies
let express = require('express');
let router = express.Router();
let db = require('./../models/db');
let model = require('./../models/model');

//Home Route
router.get('/', (req, res) => {
  
  var query = 'select * from daily_journal';
  
  db.connector.query(query, (err, data1) => {
    //console.log(success);

    

    var query2 = 'select * from journal_entry';

    db.connector.query(query2, (err, data2) => {
      res.render('index.ejs', {daily_journal: data1, journal_entry: data2})
    })

    
  })
})

//New Transaction route
router.get('/new-transaction', (req, res) => {
  res.render('addTransactions.ejs');
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
      else
        res.redirect('/')
    })
  })
  
})

router.get('/login', (req, res) => {
  res.render('login.ejs');
})


module.exports = router;