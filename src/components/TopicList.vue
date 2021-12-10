<template>
  <div class="flex flex-col space-y-4">
    <topic-item
      v-for="board in boards"
      :key="board.id"
      :board="{
        name: board.name,
        id: board.id,
      }"
    ></topic-item>
  </div>
</template>

<script>
import TopicItem from "./TopicItem.vue";
export default {
  name: "TopicList",
  components: {
    TopicItem,
  },
  mounted() {
    this.$store.dispatch("fetchBoards");
  },
  computed: {
    boards() {
      return this.$store.getters.getBoards;
    },
  },
};
</script>
