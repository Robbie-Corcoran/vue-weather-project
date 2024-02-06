<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <SavedCityCardSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import SavedCityCardSkeleton from '@/components/SavedCityCardSkeleton.vue';
import AsyncCityView from './AsyncCityView.vue';
</script>
