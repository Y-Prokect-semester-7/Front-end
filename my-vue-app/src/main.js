import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createAuth0 } from '@auth0/auth0-vue';
import router from './router'

const app = createApp(App);

app.use(router)

app.use(
  createAuth0({
    domain: "dev-2zn6n2l3.us.auth0.com",
    clientId: "4NbWTrR1t7E2rmYjAAT5xCppROeHeSr9",
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
);

app.mount('#app');
