<template>
  <Transition name="modal-outer">
    <div
      v-show="modalActive"
      class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 px-8"
    >
      <Transition name="modal-inner">
        <div v-if="modalActive" class="p-4 bg-white self-start mt-32 max-w-screen-md">
          <slot />
          <button
            class="text-white mt-8 bg-weather-primary py-2 px-6"
            @click="$emit('close-modal')"
          >
            Close
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
defineEmits(['close-modal'])

defineProps({
  modalActive: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}
</style>
