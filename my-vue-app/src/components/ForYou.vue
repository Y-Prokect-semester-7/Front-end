<template>
    <div class="for-you-feed">
      <div class="feed-header">
        <h1>For You</h1>
      </div>
      <div class="tweets">
        <TweetPost v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
      </div>
    </div>
  </template>
  
  <script>
  import TweetPost from './TweetPost.vue';
  
  export default {
    name: 'ForYou',
    components: {
      TweetPost
    },
    data() {
      return {
        tweets: [
          {
            id: 1,
            username: 'Jane Doe',
            handle: 'janedoe',
            content: 'This is my first tweet on Y!',
            userAvatar: 'https://randomuser.me/api/portraits/women/1.jpg'
          },
          {
            id: 2,
            username: 'John Smith',
            handle: 'johnsmith',
            content: 'Loving the new features on Y!',
            userAvatar: 'https://randomuser.me/api/portraits/men/2.jpg'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .for-you-feed {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  .feed-header {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  