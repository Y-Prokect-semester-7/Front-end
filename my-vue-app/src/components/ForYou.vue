<script setup>
import { ref, onMounted } from 'vue';
import TweetPost from './TweetPost.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { GetToken } from '../security/SecurityConfig.js';

// Reactive variables
const tweets = ref([]);

const { user, isAuthenticated, loginWithRedirect } = useAuth0()
const waitForUser = async () => {
  while (!user.value) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
const fetchUserData = async () => {
  try {
    const token = await GetToken()
    if (!token || !user.value?.sub) {
      console.error('No token or user info')
      return
    }

    const userId = encodeURIComponent(user.value.sub) // e.g., "auth0|abc123"

    const response = await fetch(`http://localhost:5000/tweet/user/${userId}`, {
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
    console.log('Fetched tweets:', data)

    tweets.value = data.map((tweet, index) => ({
      id: index,
      handle: user.value.nickname || user.value.name,
      username: user.value.name || 'Anonymous',
      userAvatar: user.value.picture || 'https://via.placeholder.com/40',
      content: tweet.content,
      timestamp: new Date(tweet.timestamp).toLocaleString() // Format the date
    }))

  } catch (error) {
    console.error("Error fetching tweets:", error)
  }
}

// Automatically fetch on component mount
onMounted(fetchUserData)
onMounted(async () => {
  await waitForUser();
  fetchUserData();
});

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
