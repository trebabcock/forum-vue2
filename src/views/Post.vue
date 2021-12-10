<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col space-y-4 w-2/6 justify-center">
      <div
        class="bg-gray-800 flex-grow rounded-lg shadow-lg w-full p-4 flex flex-col space-y-4"
      >
        <span class="font-bold text-lg">{{ post.title }}</span>
        <span class="whitespace-pre-line">{{ post.content }}</span>
        <span class="text-xs"
          >Posted {{ time }} by
          <router-link :to="'/user/' + author.username" class="text-gray-400">{{
            author.username
          }}</router-link></span
        >
      </div>
      <div class="flex flex-col space-y-2">
        <textarea
          class="p-4 w-full bg-gray-800 hover:bg-gray-600 rounded-lg outline-none focus:bg-gray-600 shadow-lg h-24"
          placeholder="Add Comment"
          v-model="comment"
          id="comment"
        ></textarea>
        <div
          class="rounded h-10 flex py-2 px-4 max-w-min items-center justify-center bg-gray-800 hover:bg-gray-600 cursor-pointer shadow-lg"
          @click="addComment"
        >
          <span>Create</span>
        </div>
        <span class="text-2xl font-bold text-gray-500">Comments</span>
        <div class="flex flex-col space-y-2">
          <Comment
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../components/Comment.vue";
const moment = require("moment");
export default {
  name: "Post",
  data() {
    return {
      comment: "",
      author: {},
      comments: [],
      post: {},
      id: this.$route.params.id,
    };
  },
  components: {
    Comment,
  },
  mounted() {
    this.axios.get("/posts/" + this.id).then((response) => {
      if (response.status == 200) {
        this.post = response.data;
      } else {
        console.log(response);
      }
    });
    this.axios
      .get("/user/" + this.post.author_id + "/public")
      .then((response) => {
        if (response.status == 200) {
          this.author = response.data;
        } else {
          console.log(response);
        }
      });
    this.axios.get("/post/" + this.id + "/comments").then((response) => {
      if (response.status == 200) {
        this.comments = response.data;
      } else {
        console.log(response);
      }
    });
    this.axios.get("/user/public/" + this.post.author_id).then((response) => {
      if (response.status == 200) {
        this.author = response.data;
      } else {
        console.log(response);
      }
    });
  },
  methods: {
    addComment: function () {
      if (!this.loggedIn) {
        this.$router.push("/login");
        return;
      }
      if (!this.comment) {
        return;
      }
      var newComment = {
        post_id: this.post.id,
        content: this.comment,
      };
      this.comment = "";
      this.$store.dispatch("addComment", newComment);
    },
  },
  computed: {
    time() {
      return moment(this.post.create_date).calendar();
    },
    loggedIn: function () {
      return this.$store.getters.getLoggedIn;
    },
  },
};
</script>
