<template>
  <div
    @click="handleCardClick(city)"
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-3">
      <p class="text-3xl self-end">
        {{ Math.round(convertTemperature(city.weather.current.temp)) }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-xs"
          >H: {{ Math.round(convertTemperature(city.weather.daily[0].temp.max)) }}&deg;</span
        >
        <span class="text-xs"
          >L: {{ Math.round(convertTemperature(city.weather.daily[0].temp.min)) }}&deg;</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { metricToImperial } from './ToggleUnits/convertUnits';

const convertTemperature = (temperature) => {
  return props.unitPreference === 'metric' ? temperature : metricToImperial(temperature);
};
const props = defineProps({
  city: {
    type: Object,
    default: () => ({})
  },
  unitPreference: String,
  toggleUnitPreference: Function
});

const emit = defineEmits(['cardClick']);

const handleCardClick = (city) => {
  emit('cardClick', city);
};
</script>
