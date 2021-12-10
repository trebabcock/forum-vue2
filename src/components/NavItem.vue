<template>
  <router-link
    class="
      block
      antialiased
      hover:bg-gray-700
      px-4
      py-2
      mt-2
      text-sm
      font-semibold
      truncate
      rounded-lg
      w-full
    "
    v-bind:class="{
      'bg-gray-700 border-r-2 border-gray-400 drop-shadow-lg': isActive,
      'bg-gray-800': !isActive,
    }"
    :to="route"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    route: {
      type: String,
      required: true,
    },
  },
  computed: {
    isActive() {
      return this.$route.path === this.route;
    },
  },
};
</script>
