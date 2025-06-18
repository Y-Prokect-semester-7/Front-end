<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { checkUserExists } from './services/authService';
import { isUserRegistered } from './composables/useUserRegistration'; // ✅ import global ref

const { user, isAuthenticated, isLoading } = useAuth0();
const auth0 = useAuth0();
const router = useRouter();

const login = () => {
  auth0.loginWithRedirect();
};
const logout = () => {
  auth0.logout({ returnTo: window.location.origin });
};

onMounted(async () => {
  const waitUntilReady = new Promise(resolve => {
    const interval = setInterval(() => {
      if (!isLoading.value) {
        clearInterval(interval);
        resolve();
      }
    }, 50);
  });

  await waitUntilReady;

  if (isAuthenticated.value && user.value) {
    const exists = await checkUserExists(user.value.sub);
    isUserRegistered.value = exists;

    if (!exists && router.currentRoute.value.path !== '/addaccount') {
      router.replace('/addaccount');
    }
  }
});
</script>


<template>
  <nav style="padding: 1rem; background-color: #f0f0f0; display: flex; gap: 1rem;">
    <router-link to="/">🏠 Home</router-link>
    <router-link to="/add">📝 Post Tweet</router-link>
    <div style="margin-left: auto;">
      <button v-if="!isAuthenticated" @click="login">Log in</button>
      <button v-else @click="logout">Log out</button>
      <router-link v-if="isAuthenticated" to="/editaccount">Edit Account</router-link>
    </div>
  </nav>

  <main style="padding: 1rem;">
    <router-view />
  </main>

  <div v-if="isAuthenticated" style="padding: 1rem;">
    <h2>Welcome, {{ user.name }}</h2>
    <p><strong>User ID:</strong> {{ user.sub }}</p>
  </div>
</template>
