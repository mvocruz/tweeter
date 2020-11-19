/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
        $('.section-tweets-list').prepend(newTweet);
    }
  };
  
  const createTweetElement = function(data) {
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    
    const user = data.user;
    const message = data.content;
    const date = data.created_at;
    const $avatar = $(`<img class="user-avatar" src=${user.avatars}>`);
    const $name = $(`<p class="user-nickname">${user.name}</p>`);
    const $handle = $(`<div class="user-handle">${user.handle}</div>`);
    const $divHeader = $(`<div class="tweet-avatar"></div>`);
    $divHeader.append($avatar).append($name);
    const safeHTML = `<p name="text" class="tweet-content">${escape(message.text)}</p>`;
    // const $tweetText = $(`<p name="text" class="tweet-content" >${safeHTML}</p>`);
    const $divFooter = $(`<div class="interaction-buttons">
    <button style="color:#4056A1; border:none; font-size: 15px;" class="flag-button" type="submit"><i class="fas fa-flag"></i></button>
    <button style="color:#4056A1; border:none; font-size: 15px;" class="retweet-button" type="submit"><i class="fas fa-retweet"></i></button>
    <button style="color:#4056A1; border:none; font-size: 15px;" class="like-button" type="submit"><i class="fas fa-heart"></i></button>
    </div>`);
    const $tweetDate = $(`<output name="date-counter" class="date-counter" for="article-tweets-list">${date}</output>`);
    const $tweetHeader = $(`<header class="header-tweets-list"></header>`);
    $tweetHeader.append($divHeader).append($handle);
    const $tweetBody = $(`<div class="div-tweets-list"></div>`);
    $tweetBody.append(safeHTML);  
    const $tweetFooter = $(`<footer class="footer-tweets-list"></footer>`);
    $tweetFooter.append($divFooter).append($tweetDate);
    const $tweet = $(`<article class="article-tweets-list"></article>`);
    $tweet.append($tweetHeader).append($tweetBody).append($tweetFooter);
    
    return $tweet;
    };

  $('form').submit(function(event) {
    $(".error-line").slideUp();
    event.preventDefault();
    const text = $("#tweet-text").val();
      if (!text) {
        $(".error-line p").text('⚠︎  It seems that the tweet is empty. Please type a message and submit again!  ⚠︎');
        $(".error-line").slideDown();
      } else if (text.length > 140) {
        $(".error-line p").text("⚠︎  Your tweet is above the characters limit. Please remove some characters and submit again!  ⚠︎");
        $(".error-line").slideDown();
      } else {
        $.ajax({url: "/tweets", method: "POST", data: $("#tweet-text").serialize()})
         .then(() => {
          $("#tweet-text").val('');
          $.ajax("/tweets",{method: "GET"})
            .then(data => {
              renderTweets([data[data.length - 1]]);
          })
          .catch(error => {
            console.log(error);
          })
        })
      }
    });
  

  const loadTweets = function() {
    $.ajax("/tweets", {method: "GET"})
    .then(function(res) {
      renderTweets(res);
    })
    .catch(error => {
      console.log(error);
    });
  };

  loadTweets();

});