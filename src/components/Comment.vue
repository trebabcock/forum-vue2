<template>
  <div class="flex flex-col space-y-4 w-full justify-center">
    <div
      class="bg-gray-800 flex-grow rounded-lg shadow-lg w-full p-4 flex flex-col space-y-4"
    >
      <span class="whitespace-pre-line">{{ comment.content }}</span>
      <span class="text-xs"
        >Posted {{ time }} by
        <router-link :to="'/user/' + author.username" class="text-gray-400">{{
          author.username
        }}</router-link></span
      >
    </div>
  </div>
</template>

<script>
const moment = require("moment");
export default {
  name: "Comment",
  props: {
    comment: {},
  },
  data() {
    return {
      author: {},
    };
  },
  mounted() {
    this.axios
      .get("/user/public/" + this.comment.author_id)
      .then((response) => {
        if (response.status == 200) {
          this.author = response.data;
        } else {
          console.log(response);
        }
      });
  },
  computed: {
    time() {
      return moment(this.comment.create_date).calendar();
    },
  },
};
</script>
