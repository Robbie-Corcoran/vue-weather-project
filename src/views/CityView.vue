<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <img class="bg-transparent" src="../../public/loading.gif" alt="" />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from './AsyncCityView.vue';
</script>
