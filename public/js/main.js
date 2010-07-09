$(document).ready(function() {
  $.jQTouch(); //http://stackoverflow.com/questions/2543397/how-to-load-jqtouch-on-demand to get it to work
  
  
  var calories = $('#calories');
  
  $('#calories-submit a').click(function() {
    if(calories.val().length) {
      var el = $(this).addClass('active');
      var file = el.attr('href');

      $.post('/add', { file: file, value: calories.val() }, function(data) {
        updateinfo();
        
        setTimeout(function() { //show minimal progress on fast server
          el.removeClass('active');
          calories.val('');
        }, 1000);
      });
    }
    
    return false;
  });
  
  
  var info = $('#info');
  
  function updateinfo() {
    $('.eaten p', info).load('/eaten');
    $('.burned p', info).load('/burned');
  }
  updateinfo();
});