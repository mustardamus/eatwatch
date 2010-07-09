$(document).ready(function() {
  $.jQTouch(); //http://stackoverflow.com/questions/2543397/how-to-load-jqtouch-on-demand to get it to work
  
  
  $('#calories-submit .eaten').click(function() {
    var el = $(this);
    var calories = $('#calories');
    
    if(calories.val().length) {
      el.addClass('active');
      
      $.post('/eaten', { value: calories.val() }, function(data) {
        console.log(data);
        setTimeout(function() { //show minimal progress on fast server
          el.removeClass('active');
          calories.val('');
        }, 1000);
      });
    }
    
    return false;
  });
});