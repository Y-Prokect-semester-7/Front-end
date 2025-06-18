<template>
  <div v-if="user">
    <h2>Edit Profile</h2>
    <form @submit.prevent="submitForm">
      <input v-model="newName" placeholder="New Name" />
      <input v-model="newEmail" placeholder="New Email" />
      <button type="submit">Save</button>
    </form>
  

    <form @submit.prevent="submitPasswordChange">
      <input v-model="newPassword" type="password" placeholder="New Password" />
      <button type="submit">Change Password</button>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { user, getAccessTokenSilently } = useAuth0();
const newName = ref(user.value.name);
const newEmail = ref(user.value.email);
//name and email change
const submitForm = async () => {
  console.log('Submitting update:', newName.value, newEmail.value)
  const token = await getAccessTokenSilently();

  try {
    const response = await fetch('twitterclone-avewc3b9bnbyaxfk.westeurope-01.azurewebsites.net/update-user', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.value.sub,
        name: newName.value,
        email: newEmail.value
      })
    });

    const result = await response.json();
  } catch (err) {
    console.error('Error updating user:', err);
    alert('Failed to update profile.');
  }
};


//password change
const newPassword = ref('')

const submitPasswordChange = async () => {
  try {
    const res = await fetch('twitterclone-avewc3b9bnbyaxfk.westeurope-01.azurewebsites.net/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.value.sub,
        password: newPassword.value
      })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed')
    alert('Password changed successfully!')
  } catch (err) {
    alert('Error ' + err.message)
  }
}

</script>