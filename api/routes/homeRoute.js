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

    /*var id = success[2].id;
    var particular = model.getJournalEntryParticular({particular: success[2].particular, name: success[2].name, type: success[2].type})
    var description = success[2].description;
    var debit = success[2].debit != 0 ? success[2].debit: success[2].credit;
    var credit = success[2].debit != 0 ? success[2].debit: success[2].credit;
    var date = new Date(success[2].Date).toLocaleDateString().split('/').reverse().join('-');

    var query2 = `insert into journal_entry values(${id}, '${particular}', '${description}', ${debit}, ${credit}, '${date}')`

    db.connector.query(query2, (err, success) => {
      console.log(err);
      console.log(success);
    })*/

    var query2 = 'select * from journal_entry';

    db.connector.query(query2, (err, data2) => {
      res.render('index.ejs', {daily_journal: data1, journal_entry: data2})
    })

    
  })
}) 


module.exports = router;