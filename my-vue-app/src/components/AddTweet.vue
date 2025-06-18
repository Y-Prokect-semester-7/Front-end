<script setup>
import { ref, computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import axios from 'axios'
import { GetToken } from '../security/SecurityConfig.js'

const { user, isAuthenticated, loginWithRedirect } = useAuth0()

const content = ref('')
const selectedFile = ref(null)
const userId = computed(() => user.value?.sub || 'guest')

const onFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

const postTweet = async () => {
  if (!content.value || !isAuthenticated.value) {
    await loginWithRedirect()
    return
  }

  const token = await GetToken();
  if (!token) {
    console.error('No token received');
    return;
  }

  const formData = new FormData()
  formData.append('UserId', userId.value)
  formData.append('Content', content.value)
  formData.append('Visibility', true)

  if (selectedFile.value) {
    formData.append('Image', selectedFile.value)
  }

  try {
    const response = await axios.post('twitterclone-avewc3b9bnbyaxfk.westeurope-01.azurewebsites.net/tweet', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log('Tweet posted:', response.data)
    content.value = ''
    selectedFile.value = null
  } catch (err) {
    console.error('Error posting tweet:', err)
  }
}
</script>



<template>
  <div class="tweet-post">
    <h2>Post a Tweet</h2>
    <form @submit.prevent="postTweet">
      <textarea v-model="content" placeholder="What's on your mind?" rows="3"></textarea>
      <input type="file" @change="onFileChange" />
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
