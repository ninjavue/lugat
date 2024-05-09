import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import './index.css'


createApp(App).use(store).use(router).use(createVuestic()).mount('#app')
