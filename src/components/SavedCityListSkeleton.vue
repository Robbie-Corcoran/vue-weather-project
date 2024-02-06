<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shaodw-md">
    <div class="flex flex-col flex-1 gap-2">
      <LoadingAnimation class="max-w-[50%]" />
      <LoadingAnimation class="max-w-[40%]" />
    </div>

    <div class="flex flex-col item-end flex-1 gap-2">
      <LoadingAnimation class="max-w-[50px] w-full" />
      <LoadingAnimation class="max-w-[75px] w-full" />
    </div>
  </div>
</template>

<script setup>
import LoadingAnimation from './LoadingAnimation.vue';
</script>
