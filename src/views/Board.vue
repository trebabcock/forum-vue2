<template>
  <div class="flex flex-col space-y-4 h-full">
    <div
      class="
        rounded-lg
        w-full
        h-36
        bg-gray-800
        shadow-lg
        flex
        items-center
        p-4
        space-x-6
      "
    >
      <div
        class="
          flex flex-col
          w-64
          space-y-4
          items-center
          justify-center
          font-bold
        "
      >
        <span class="text-2xl">{{ board.name }}</span>
        <div
          class="
            w-36
            h-10
            cursor-pointer
            rounded-lg
            shadow
            flex
            items-center
            justify-center
            hover:bg-gray-700
            bg-gray-900
          "
          @click="toCreate"
        >
          <span class="font-bold">Create Post</span>
        </div>
      </div>
      <div class="h-full border-r-2 border-gray-900"></div>
      <div class="overflow-y-auto h-full px-2">
        <span class="overflow-y-auto min-h-full overflow-ellipsis"
          >{{ board.description }}
        </span>
      </div>
    </div>
    <div
      class="
        w-full
        h-full
        flex flex-col flex-grow
        py-4
        px-4
        bg-gray-800
        rounded-lg
        shadow-lg
        space-y-2
      "
    >
      <post-item
        v-for="post in posts"
        :key="post.id"
        :post="{
          title: post.title,
          id: post.id,
        }"
      ></post-item>
    </div>
  </div>
</template>

<script>
import PostItem from "../components/PostItem.vue";
export default {
  name: "Board",
  components: {
    PostItem,
  },
  methods: {
    toCreate() {
      this.$router.push("/board/" + this.$route.params.id + "/new");
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.$store.dispatch("fetchPosts", this.$route.params.id);
      this.$store.dispatch("getBoard", this.$route.params.id);
    });
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },
    board() {
      return this.$store.getters.getBoard;
    },
  },
};
</script>
