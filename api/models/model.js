
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

let updateLedger = (data) => {
  var date = data.date;
  var debitAccount = data.particular.split('DR to')[0];
  var creditAccount = data.particular.split('DR to ')[1];
  var debit = data.debit;
  var credit = data.credit;

  


}

module.exports = {
  getJournalEntryParticular,
  updateLedger
}