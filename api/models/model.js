let db = require('./db');


//Convert Daily Journal to Journal Entry
let getJournalEntryParticular = (data) => {
  var particular = ''
  
  switch(data.particular){
    case 'Goods Sold':
      switch(data.type){
        case 'cash':
          particular = 'Cash Account DR to Sales Account'
          break;
        case 'bank':
          particular = 'Bank Account DR to Sales Account'
          break;
        case 'other':
          particular = data.name+' A/C DR to Sales Account'
          break;
      }
      break;
    
    case 'Goods Purchased':
      switch(data.type){
        case 'cash':
          particular = 'Purchase Account DR to Cash Account';
          break;
        case 'bank':
          particular = 'Purchase Account DR to Bank Account'; 
          break;
        case 'other':
          particular = 'Purchase Account DR to '+data.name+' A/C';
          break;
      }
      break;

    case 'Cash Recieved':
      particular = 'Cash Account DR to '+data.name+' A/C'
      break;
    
    case 'Cheque Recieved':
      particular = 'Bank Account DR to '+data.name+' A/C'
      break;
    
    case 'Cash Paid':
      particular = data.name+' A/C DR to Cash Account'
      break;

    case 'Cheque Paid':
      particular = data.name+' A/C DR to Bank Account'
      break;
    
    case 'Salary Paid':
      particular = 'Salary Account DR to Bank Account'
      break;
    
    case 'Cash Drawn':
      particular = 'Drawing Account DR to Bank Account'
      break;

    case 'Expenses':
      particular = 'Expenses Account DR to Bank Account'
  }

  return particular;
}

let updateLedger = (data, callback) => {
  var date = data.date
  console.log("date = "+date)
  var debitAccount = data.particular.split(' DR to')[0];
  var creditAccount = data.particular.split('DR to ')[1];
  var debitParticular = 'To '+creditAccount;
  var creditParticular = 'By '+debitAccount;
  var debit = data.debit;
  var credit = data.credit;

  debitAccount = debitAccount.split(' ').join('_').toLowerCase();
  debitAccount = debitAccount.replace('/', '');
  creditAccount = creditAccount.split(' ').join('_').toLowerCase();
  creditAccount = creditAccount.replace('/', '')

  //console.log(debitAccount)
  //console.log(creditAccount)

  var query = `create table if not exists ${debitAccount}(
    id int primary key AUTO_INCREMENT,
    date date,
    particular varchar(100),
    debit int,
    credit int
  );`;
  query += `create table if not exists ${creditAccount}(
    id int primary key AUTO_INCREMENT,
    date date,
    particular varchar(100),
    debit int,
    credit int
  );`;
  query += `insert into ${debitAccount} (date, particular, debit, credit) values ('${date}', '${debitParticular}', ${debit}, 0);`
  query += `insert into ${creditAccount} (date, particular, debit, credit) values ('${date}', '${creditParticular}', 0, ${credit});`

  db.connector.query(query, (err, success) => {
    callback(err, success);
  })

}

module.exports = {
  getJournalEntryParticular,
  updateLedger
}