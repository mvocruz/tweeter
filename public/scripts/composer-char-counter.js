$(document).ready(function() {
  // --- our code goes here ---


  $("#tweet-text").keyup(function(event) { 
    const charMax = 140;
    const $tweetForm = $(this);
    const $parent = $('.footer');
    
    let length = $tweetForm.val().length;
    
    let charsLeft = charMax - length;
    
    const $counter = $parent.children('.counter');

    if (charsLeft < 0) {
      $counter.css('color', 'red');
      $counter.text(charsLeft)
    } else {
      $counter.css('color', '#545149');
    $counter.text(charsLeft)
    };
  })

// to do red when invalid
// fix the event
// no total retargeted

});
