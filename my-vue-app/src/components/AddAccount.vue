<template>
  <div v-if="user">
    <h2>Create Profile</h2>
    <form @submit.prevent="submitForm">
      <input v-model="newName" placeholder="Name" /><br /><br />
      <textarea v-model="newBio" placeholder="Bio" rows="3"></textarea><br /><br />
      <button type="submit">Create Account</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { isUserRegistered } from '../composables/useUserRegistration'; // adjust path if needed


const { user, getAccessTokenSilently } = useAuth0();
const router = useRouter();

const newName = ref('');
const newBio = ref('');
const auth0Id = user.value.sub;
const email = user.value.email;

const submitForm = async () => {
  try {
    const token = await getAccessTokenSilently();
    if (isUserRegistered.value === true) {
      console.log('✅ User already exists, skipping creation');
      router.push('/');
      return;
    }
    const response = await axios.post(
      'https://twitterclone-avewc3b9bnbyaxfk.westeurope-01.azurewebsites.net/adduser',
      {
        auth0Id,
        username: newName.value,
        bio: newBio.value,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('✅ Account created:', response.data);
    sessionStorage.setItem('userExists', 'true'); // mark session
    router.push('/');

  } catch (error) {
    console.error('❌ Error creating user:', error);
    alert('Something went wrong while creating your account.');
  }
};
</script>
