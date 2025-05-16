<template>
    <div class="tweet">
  <div class="user-info">
    <img :src="tweet.userAvatar" alt="User Avatar" class="avatar" />
    <div class="user-details">
      <h4>{{ tweet.username }}</h4>
      <p>@{{ tweet.handle }}</p>
      <p class="timestamp">{{ tweet.timestamp }}</p> <!-- 👈 New -->
    </div>
  </div>
  <p>{{ tweet.content }}</p>
  <div class="tweet-actions">
    <button>Like</button>
    <button>Retweet</button>
    <button>Reply</button>
  </div>
</div>
  </template>
  
  <script>
  export default {
    name: 'TweetPost', // Multi-word component name
    props: {
      tweet: Object
    }
  };
  </script>
  
  <style scoped>
  .tweet {
    border-bottom: 1px solid #e1e1e1;
    padding: 15px;
  }
  .user-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%; 
    margin-right: 10px;
  }
  .user-details h4 {
    margin: 0;
    font-size: 1.2em;
  }
  .tweet-actions button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-right: 10px;
  }
  .timestamp {
  font-size: 0.8em;
  color: #666;
}

  </style>

