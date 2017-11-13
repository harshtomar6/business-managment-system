

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();

  $('#sidebar ul li').click(sideClick);
})

function toggleSidebar(){

  if($('#sidebar').width() == 0)
    $('#sidebar').css('width', '260px');
  else
    $('#sidebar').css('width', '0px');
}

function sideClick(){
  //add CSS
  $('#sidebar ul li').removeClass('selected');
  $(this).addClass('selected');

  var tab = $(this).first().text()

  switch(tab){
    case 'Home':
      window.location.href='/'
      break;
    case 'New Transaction':
      window.location.href='/new-transaction'
      break;
  }
}
 