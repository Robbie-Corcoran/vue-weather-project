<template>
  <div v-for="city in savedCities" :key="city.id">
    <SavedCityCard
      :city="city"
      :unitPreference="unitPreference"
      :toggleUnitPreference="toggleUnitPreference"
      @cardClick="gotToCityView"
    />
  </div>

  <p v-if="savedCities.length === 0">
    No locations saved. To keep a list of your favourite places, search in the field above
  </p>

  <button v-else class="flex flex-row-reverse">
    <label class="relative inline-flex items-center me-5 cursor-pointer">
      <input @click="toggleUnitPreference" type="checkbox" class="sr-only peer" checked />
      <div
        class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:bg-weather-secondary dark:peer-focus:bg-weather-secondary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-weather-secondary"
      ></div>
      <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{
        unitPreference
      }}</span>
    </label>
  </button>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SavedCityCard from './SavedCityCard.vue';
import { useRouter } from 'vue-router';

const savedCities = ref([]);

const getCitiesFromLocalStorage = async () => {
  if (localStorage.getItem(localStorage.key('savedCities'))) {
    savedCities.value = JSON.parse(localStorage.getItem(localStorage.key('savedCities')));

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=63766a46446a98de7b39171dc68dc049&units=metric`
        )
      );
    });

    const weatherDataFromApi = await Promise.all(requests);

    await new Promise((res) => setTimeout(res, 1000));

    weatherDataFromApi.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};

await getCitiesFromLocalStorage();

const unitPreference = ref('Metric');

const toggleUnitPreference = () => {
  unitPreference.value = unitPreference.value === 'Metric' ? 'Imperial' : 'Metric';
};

const router = useRouter();
const gotToCityView = (city) => {
  router.push({
    name: 'cityView',
    params: { state: city.state, city: city.city },
    query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng }
  });
};
</script>
