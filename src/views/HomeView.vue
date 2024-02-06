<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        v-if="mapboxSearchReusults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="mapboxSearchReusults.length == 0">No results for your query, please try again.</p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchReusults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <SavedCityList />
        <template #fallback>
          <SavedCityListSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import SavedCityList from '../components/SavedCityList.vue';
import SavedCityListSkeleton from '@/components/SavedCityListSkeleton.vue';

const mapboxApiKey =
  'pk.eyJ1Ijoicm9iYmllY29yY29yYW45NCIsImEiOiJjbHM2OTk2OWIxbXY2Mnlydzk1Ymw5NjQyIn0.yjYx0GoFHx-SFYv1Bn_bIA';
const searchQuery = ref('');
const queryTimeout = ref(null);
const mapboxSearchReusults = ref(null);
const searchError = ref(null);

const router = useRouter();
const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(',');
  router.push({
    name: 'cityView',
    params: { state: state.trim(), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true
    }
  });
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value != '') {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxApiKey}&types=place`
        );
        mapboxSearchReusults.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchReusults.value = null;
  }, 300);
};
</script>
