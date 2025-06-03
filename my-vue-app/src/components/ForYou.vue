<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { GetToken } from '../security/SecurityConfig.js'
import TweetPost from './TweetPost.vue'

const tweets = ref([])
const auth = useAuth0()
const user = auth.user
const isAuthenticated = auth.isAuthenticated
const getAccessTokenSilently = auth.getAccessTokenSilently

watchEffect(async () => {
  if (!user.value?.sub || !isAuthenticated.value || !getAccessTokenSilently) {
    return
  }

  const token = await GetToken(getAccessTokenSilently)
  console.log(token);
  if (!token) { 
    console.error('Token not available')
    return
  } 
  const userId = encodeURIComponent(user.value.sub)
  try {
    // const response = await fetch(`http://localhost:5000/tweet/user/${userId}`, {
    const response = await fetch(`https://twitterclone-avewc3b9bnbyaxfk.westeurope-01.azurewebsites.net/tweet/user/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }) 

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    tweets.value = data.map((tweet, index) => ({
      id: index,
      handle: user.value.nickname || user.value.name,
      username: user.value.name || 'Anonymous',
      userAvatar: user.value.picture || 'https://via.placeholder.com/40',
      content: tweet.content,
      timestamp: new Date(tweet.timestamp).toLocaleString()
    }))
  } catch (err) {
    console.warn("Falling back to Azure Function:", err);

    const fallback = await fetch(`https://tweet-functions-api.azurewebsites.net/api/tweets/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // Optionally add token here if your Azure Function requires auth
        // Authorization: `Bearer ${token}`
      }
      
    });

    if (!fallback.ok) {
      throw new Error(`Fallback failed: ${fallback.status}`);
    }

    return await fallback.json();
  }
})



</script>

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
