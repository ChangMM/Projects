$(document).ready(function() { 
  
  $('#nav').onePageNav();

  var x = 0; var y = 0;var z = 0;var w = 0;
  var inAnimation = false; 
  var $p1=$('.pic1 img');
  var $p2=$('.pic2 img');
  var $p3=$('.pic3 img');
  var $p4=$('.pic4 img');

  $('.pic1 img').each(function() {
    x++; 
    $(this).css('z-index', x); 
  });

  $('.pic2 img').each(function() {
    y++; 
    $(this).css('z-index', y);
  });

  $('.pic3 img').each(function() {
    z++; 
    $(this).css('z-index', z); 
  });

  $('.pic4 img').each(function() {
    w++; 
    $(this).css('z-index', w); 
  });


  function swapFirstLast(isFirst,pic,m) {
    if(inAnimation) return false; 
    else inAnimation = true; 
    
    var processZindex, direction, newZindex, inDeCrease;
    
    if(isFirst) { processZindex = m; direction = '-'; newZindex = 1; inDeCrease = 1; } 
    else { processZindex = 1; direction = ''; newZindex = m; inDeCrease = -1; } 
    pic.each(function() { 
      if($(this).css('z-index') == processZindex) { 
        $(this).animate({ 'top' : direction + $(this).height() + 'px' }, 'slow', function() { 
          $(this).css('z-index', newZindex) 
            .animate({ 'top' : '0' }, 'slow', function() { 
              inAnimation = false; 
            });
        });
      } else { 
        $(this).animate({ 'top' : '0' }, 'slow', function() { 
          $(this).css('z-index', parseInt($(this).css('z-index')) + inDeCrease); 
        });
      }
    });

    
    return false; 
  }
  
  $('.next1 a').click(function() {
    return swapFirstLast(true,$p1,x); 
  });
  
  $('.prev1 a').click(function() {
    return swapFirstLast(false,$p1,x); 
  });

  $('.next2 a').click(function() {
    return swapFirstLast(true,$p2,y); 
  });
  
  $('.prev2 a').click(function() {
    return swapFirstLast(false,$p2,y); 
  });

  $('.next3 a').click(function() {
    return swapFirstLast(true,$p3,z); 
  });
  
  $('.prev3 a').click(function() {
    return swapFirstLast(false,$p3,z); 
  });

  $('.next4 a').click(function() {
    return swapFirstLast(true,$p4,w); 
  });
  
  $('.prev4 a').click(function() {
    return swapFirstLast(false,$p4,w); 
  });
});