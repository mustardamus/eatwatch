var bodyburn = 2300;
var burngoal = -1024;

$(document).ready(function() {
  var eatwatch = $('<div/>', {
    id: 'eatwatch'
  }).prependTo('#home');
  
  
  $.jQTouch(); //http://stackoverflow.com/questions/2543397/how-to-load-jqtouch-on-demand to get it to work
  
  
  var calories = $('#calories');
  
  $('#calories-submit a').click(function() {
    if(calories.val().length) {
      var el = $(this).addClass('active');
      var file = el.attr('href');

      $.post('/add', { file: file, value: calories.val() }, function(data) {
        updateinfo();
        el.removeClass('active');
        calories.val('');
      });
    }
    
    return false;
  });
  
  
  var info = $('#info');
  var infoEaten = $('.eaten p', info);
  var infoBurned = $('.burned p', info);
  
  function loadnum(url, el) {
    $.ajax({
      url: url,
      async: false,
      success: function(data) {
        el.text(data);
      }
    });
  }
  
  function updateinfo() {
    loadnum('/eaten', infoEaten);
    loadnum('/burned', infoBurned);
    
    var sum = parseInt(infoEaten.text()) - (bodyburn + parseInt(infoBurned.text()));
    
    $('.sum p', info).text(sum);
    eatwatch.removeClass();
    
    if(sum < burngoal) {
      eatwatch.addClass('eatwatch-eat');
      calories.attr('placeholder', (-+(sum-burngoal)) + ' noch essen');
    } else {
      eatwatch.addClass('eatwatch-donteat');
      calories.attr('placeholder', (sum-burngoal) + ' zuviel');
    }
  }
  updateinfo();
  
  
  
  $('#reset a').click(function() {
    if(confirm('Wirklich zurücksetzen?')) {
      $.post('/reset', function(data) {
        updateinfo();
      });
    }
    
    return false;
  });
});