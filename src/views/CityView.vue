<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <img class="bg-transparent" src="/loading.gif" alt="" />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from './AsyncCityView.vue';
</script>
