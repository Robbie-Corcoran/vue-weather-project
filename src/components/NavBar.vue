<template>
  <header class="sticky w-full top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <img class="max-w-10" src="/sun.png" alt="" />
          <p class="text-2xl pt-1">SkyGuard</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        ></i>
      </div>

      <BaseModal
        :modalActive="modalActive"
        @close-modal="toggleModal"
        class="fixed inset-0 flex items-center justify-center"
      >
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            SkyGuards allows you to track the current and future weather of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>Search for your city by entering the name into the search bar.</li>
            <li>
              Select a city within the results, this will take you to the current weather for your
              selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This will save the city
              to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within the home page. At
            the bottom of the page, there will be am option to delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import BaseModal from './BaseModal.vue';
import { uid } from 'uid';
import { ref } from 'vue';

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem(localStorage.key('savedCities')));
  }

  const locationObject = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng
    }
  };

  savedCities.value.push(locationObject);
  localStorage.setItem('savedCities,', JSON.stringify(savedCities.value));
  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObject.id;
  router.replace({ query });
};
</script>
