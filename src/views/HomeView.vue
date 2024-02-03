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
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const mapboxApiKey =
  'pk.eyJ1Ijoicm9iYmllY29yY29yYW45NCIsImEiOiJjbHM2OTk2OWIxbXY2Mnlydzk1Ymw5NjQyIn0.yjYx0GoFHx-SFYv1Bn_bIA'
const searchQuery = ref('')
const queryTimeout = ref(null)
const mapboxSearchReusults = ref(null)

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value != '') {
      const result = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxApiKey}&types=place`
      )
      mapboxSearchReusults.value = result.data.features
      console.log(mapboxSearchReusults)
      return
    }
    mapboxSearchReusults.value = null
  }, 300)
}
</script>
