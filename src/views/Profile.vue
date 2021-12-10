<template>
  <div class="flex flex-col w-full h-full space-y-4">
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
      <img
        class="rounded-lg h-full object-fill shadow-lg"
        src="https://images.iphonephotographyschool.com/24755/portrait-photography.jpg"
      />
      <div class="flex flex-col flex-shrink-0 space-y-2">
        <span>Posts: 8</span>
        <span>Posts: 42</span>
        <span>Points: 196</span>
      </div>
      <div class="h-full border-r-2 border-gray-900"></div>
      <div class="overflow-y-auto h-full px-2">
        <span class="overflow-y-auto min-h-full overflow-ellipsis">{{
          viewUser.id
        }}</span>
      </div>
    </div>
    <div
      class="
        w-full
        flex flex-col flex-grow
        py-2
        px-4
        bg-gray-800
        rounded-lg
        shadow-lg
      "
    >
      <div class="w-full h-14 py-2 flex space-x-2">
        <div
          class="
            w-36
            h-10
            cursor-pointer
            rounded-lg
            shadow-lg
            flex
            items-center
            justify-center
            hover:bg-gray-700
          "
          v-bind:class="{
            'bg-gray-700': currentTab == 'posts',
            'bg-gray-900': !(currentTab == 'posts'),
          }"
          @click="tabPosts"
        >
          <span class="font-bold">Posts</span>
        </div>
        <div
          class="
            w-36
            h-10
            cursor-pointer
            rounded-lg
            shadow-lg
            flex
            items-center
            justify-center
            hover:bg-gray-700
          "
          v-bind:class="{
            'bg-gray-700': currentTab == 'comments',
            'bg-gray-900': !(currentTab == 'comments'),
          }"
          @click="tabComments"
        >
          <span class="font-bold">Comments</span>
        </div>
      </div>
      <span v-if="currentTab == 'posts'">Posts:</span>
      <span v-else-if="currentTab == 'comments'">Comments:</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "posts",
    };
  },
  mounted() {
    this.$store.dispatch(
      "getPublicUserByUsername",
      this.$route.params.username
    );
  },
  methods: {
    tabPosts: function () {
      this.tab = "posts";
    },
    tabComments: function () {
      this.tab = "comments";
    },
  },
  computed: {
    currentTab() {
      return this.tab;
    },
    viewUser() {
      return this.$store.getters.getViewUser;
    },
  },
};
</script>
