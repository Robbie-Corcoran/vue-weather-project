<template>
  <div></div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=63766a46446a98de7b39171dc68dc049&units=metric`
    );
  } catch (err) {
    console.log(err);
  }
};
</script>
