import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err);
  console.log('Vue instance:', instance);
  console.log('Error info:', info);
};

app.use(router);

router.onError((err) => {
  console.error('Router error:', err);
});

app.mount('#app');
