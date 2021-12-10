<template>
  <div
    class="flex items-center w-full h-16 bg-gray-900 rounded-lg px-6 py-2 hover:bg-gray-700 cursor-pointer shadow-lg"
    @click="toPost"
  >
    <div class="flex flex-grow items-center py-2 px-2 truncate">
      <div class="w-full truncate">
        <span class="text-xl font-bold">{{ post.title }}</span>
      </div>
    </div>
    <div class="border-r flex-shrink-0 border-gray-500 p-2">
      <span class="text-sm">Comments: 17 {{ post.commentCount }}</span>
    </div>
    <div
      class="w-40 p-2 flex-shrink-0 break-normal overflow-hidden text-xs max-h-full"
    >
      Last comment {{ post.lastCommentTime }} by
      <span class="text-gray-300">{{ post.lastCommentAuthor }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {},
  },
  methods: {
    toPost() {
      this.$router.push("/post/" + this.post.id);
    },
  },
};
</script>
