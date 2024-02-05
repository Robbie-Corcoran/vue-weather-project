<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shaodw-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>

    <div class="flex flex-col gap-3">
      <p class="text-3xl self-end">{{ Math.round(city.weather.current.temp) }}&deg;</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {}
  }
});
</script>
