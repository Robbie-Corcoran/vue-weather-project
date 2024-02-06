<template>
  <div class="flex flex-col flex-1">
    <!-- Overview -->
    <div class="flex flex-col py-12 items-center">
      <LoadingAnimation class="max-w-[300px] w-full mb-2" />
      <LoadingAnimation class="max-w-[300px] w-full mb-12" />
      <LoadingAnimation class="max-w-[300px] h-[100px] w-full mb-12" />
      <LoadingAnimation class="max-w-[300px] w-full mb-8" />
      <LoadingAnimation class="max-w-[300px] h-[75px] w-full" />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly -->
    <div class="flex flex-col py-12 items-center">
      <LoadingAnimation class="max-w-screen-md h-[100px] w-full mb-12" />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly -->
    <div class="flex flex-col py-12 px-8 items-center">
      <LoadingAnimation class="max-w-screen-md h-[100px] w-full mb-12" />
    </div>
  </div>
</template>

<script setup>
import LoadingAnimation from './LoadingAnimation.vue';
</script>
