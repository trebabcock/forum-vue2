<template>
  <div class="h-screen w-screen flex flex-col bg-gray-900 overflow-x-hidden">
    <div class="bg-transparent p-2 px-6 py-2">
      <top-bar />
    </div>
    <div class="flex flex-grow bg-transparent py-2 px-6">
      <div
        class="
          flex flex-col
          w-full
          h-full
          bg-gray-700
          text-gray-50
          shadow-md
          rounded-lg
          p-4
          space-y-2
        "
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
export default {
  components: {
    TopBar,
  },
};
</script>
