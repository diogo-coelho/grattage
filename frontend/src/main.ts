import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

// Toaster
app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000
});

// Router
app.use(router)

app.mount('#app')
