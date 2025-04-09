<script setup>
import { ref, computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import axios from 'axios'
import { onMounted } from 'vue';
import { GetToken } from '../security/SecurityConfig.js';

// async function GetSecureData() {
//   const token = await GetToken();
//   if (!token) return;

//   try {
//     const response = await axios.get('https://localhost:5000/secure', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     console.log('Secure data:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching secure data:', error);
//   }
// }

// // Example: auto-call on mount
// onMounted(() => {
//   GetSecureData();
// });

const { user, isAuthenticated, loginWithRedirect } = useAuth0()

const content = ref('')
const mediaUrl = ref('')
const tweets = ref([])

// user is a ref object, so use user.value
const userId = computed(() => user.value?.sub || 'guest')

const postTweet = async () => {
  if (!content.value || !isAuthenticated.value) {
    await loginWithRedirect()
    return
  }

  try {
    const token = await GetToken();
    if (!token) {
      console.error('No token received');
      return;
    }

    const response = await axios.post('http://localhost:5000/tweet', {
      UserId: userId.value,
      Content: content.value,
      MediaUrl: mediaUrl.value,
      Visibility: true
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Tweet posted:', response.data);
    // You can also update UI state here

  } catch (err) {
    console.error('Error posting tweet:', err);
  }

}
</script>


<template>
  <div class="tweet-post">
    <h2>Post a Tweet</h2>
    <form @submit.prevent="postTweet">
      <textarea v-model="content" placeholder="What's on your mind?" rows="3"></textarea>
      <input v-model="mediaUrl" type="text" placeholder="Optional media URL" />
      <button type="submit">Post</button>
    </form>

    <hr />

    <div class="tweet-feed">
      <h3>Recent Tweets</h3>
      <div v-for="tweet in tweets" :key="tweet.id" class="tweet">
        <img :src="tweet.userAvatar" alt="avatar" />
        <div>
          <strong>@{{ tweet.handle }}</strong>
          <p>{{ tweet.content }}</p>
          <img v-if="tweet.mediaUrl" :src="tweet.mediaUrl" class="tweet-media" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tweet-post {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

textarea,
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
}

.tweet {
  display: flex;
  gap: 1rem;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.tweet img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.tweet-media {
  margin-top: 10px;
  max-width: 100%;
  border-radius: 10px;
}
</style>
