/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
        $('.section-tweets-list').append(newTweet);
    }
  }
  
  const createTweetElement = function(data) {
    
    const user = data.user;
    const message = data.content;
    const date = data.created_at
    const $avatar = $(`<img class="user-avatar" src=${user.avatars}>`)
    const $name = $(`<p class="user-nickname">${user.name}</p>`)
    const $handle = $(`<div class="user-handle">${user.handle}</div>`)
    const $divHeader = $(`<div class="tweet-avatar"></div>`)
    $divHeader.append($avatar).append($name)
    const $tweetText = $(`<p name="text" class="tweet-content" >${message.text}</p>`)
    const $divFooter = $(`<div class="interaction-buttons">
    <button style="color:#4056A1; border:none; font-size: 15px;" class="flag-button" type="submit"><i class="fas fa-flag"></i></button>
    <button style="color:#4056A1; border:none; font-size: 15px;" class="retweet-button" type="submit"><i class="fas fa-retweet"></i></button>
    <button style="color:#4056A1; border:none; font-size: 15px;" class="like-button" type="submit"><i class="fas fa-heart"></i></button>
    </div>`)
    const $tweetDate = $(`<output name="date-counter" class="date-counter" for="article-tweets-list">${date}</output>`)
    const $tweetHeader = $(`<header class="header-tweets-list"></header>`)
    $tweetHeader.append($divHeader).append($handle)
    const $tweetBody = $(`<div class="div-tweets-list"></div>`)
    $tweetBody.append($tweetText)  
    const $tweetFooter = $(`<footer class="footer-tweets-list"></footer>`)
    $tweetFooter.append($divFooter).append($tweetDate)
    const $tweet = $(`<article class="article-tweets-list"></article>`);
    $tweet.append($tweetHeader).append($tweetBody).append($tweetFooter)
    
    return $tweet
    
    
  }
  renderTweets(data);
});