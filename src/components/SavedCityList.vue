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
    <ToggleUnitButton
      :unitPreference="unitPreference"
      :toggleUnitPreference="toggleUnitPreference"
    />
  </button>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SavedCityCard from './SavedCityCard.vue';
import ToggleUnitButton from './ToggleUnits/ToggleUnitButton.vue';
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
