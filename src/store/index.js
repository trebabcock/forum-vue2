import { createStore } from "vuex";
import router from "../router";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.83:2814/api";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.accessToken;

export default createStore({
  state: {
    loggedIn: false,
    user: {},
    userRole: "",
    accessToken: "",
    boards: [],
    board: {},
    posts: [],
    post: {},
    comments: [],
    viewUser: {},
  },
  getters: {
    getLoggedIn: (state) => state.loggedIn,
    getUser: (state) => state.user,
    getAccessToken: (state) => state.accessToken,
    getBoards: (state) => state.boards,
    getPosts: (state) => state.posts,
    getPost: (state) => state.post,
    getBoard: (state) => state.board,
    getComments: (state) => state.comments,
    getViewUser: (state) => state.viewUser,
    getUserRole: (state) => state.userRole,
  },
  mutations: {
    setLoggedIn(state, value) {
      state.loggedIn = value;
    },
    setUser(state, user) {
      state.user = user;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    setBoard(state, board) {
      state.board = board;
    },
    addBoard(state, board) {
      state.boards.push(board);
    },
    deleteBoard(state, boardId) {
      state.boards = state.boards.filter((board) => board.id != boardId);
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    setPost(state, post) {
      state.post = post;
    },
    addPost(state, post) {
      state.posts.push(post);
    },
    setComments(state, comments) {
      state.comments = comments;
    },
    addComment(state, comment) {
      state.comments.push(comment);
    },
    deleteComment(state, commentId) {
      state.comments = state.comments.filter(
        (comment) => comment.id != commentId
      );
    },
    setViewUser(state, user) {
      state.viewUser = user;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = {};
      state.userRole = {};
      state.accessToken = "";
      state.boards = [];
      state.posts = [];
      state.post = {};
      state.comments = [];
      state.viewUser = {};
    },
  },
  actions: {
    handleRegister(context, credentials) {
      axios.post("/register", credentials).then((response) => {
        if (response.status == 200) {
          router.push("/login");
        }
        console.log(response);
      });
    },
    handleLogin(context, credentials) {
      axios.post("/login", credentials).then((response) => {
        if (response.status == 200) {
          this.commit("setUser", response.data);
          this.commit("setAccessToken", response.data.token);
          this.commit("setLoggedIn", true);
          localStorage.accessToken = response.data.token;
          console.log(response);
          this.dispatch("checkRole");
          router.push("/");
        } else {
          console.log(response);
        }
      });
    },
    fetchBoards() {
      axios.get("/boards").then((response) => {
        if (response.status == 200) {
          this.commit("setBoards", response.data);
        }
      });
    },
    fetchPosts(context, boardId) {
      axios.get("/board/" + boardId + "/posts").then((response) => {
        if (response.status == 200) {
          this.commit("setPosts", response.data);
        } else {
          console.log(response);
        }
      });
    },
    getBoard(context, boardId) {
      axios.get("/board/" + boardId).then((response) => {
        if (response.status == 200) {
          this.commit("setBoard", response.data);
        } else {
          console.log(response.data);
        }
      });
    },
    createBoard(context, board) {
      axios.post("/boards/addBoard", board).then((response) => {
        if (response.status == 200) {
          this.commit("addBoard", response.data);
          router.push("/board/" + response.data.id);
        } else {
          console.log(response);
        }
      });
    },
    deleteBoard(context, boardId) {
      axios.delete("/boards/" + boardId).then((response) => {
        if (response.status == 204) {
          this.commit("deleteBoard", boardId);
        } else {
          console.log(response);
        }
      });
    },
    createPost(context, payload) {
      console.log(payload[0]);
      console.log(payload[1]);
      axios
        .post("/boards/" + payload[0] + "/newPost", payload[1])
        .then((response) => {
          if (response.status == 200) {
            router.push("/post/" + response.data.id);
          } else {
            console.log(response);
          }
        });
    },
    getPost(context, postId) {
      axios.get("/posts/" + postId).then((response) => {
        if (response.status == 200) {
          this.commit("setPost", response.data);
        } else {
          console.log(response.data);
        }
      });
    },
    checkRole() {
      axios.get("/checkRole").then((response) => {
        this.commit("setUserRole", response.data.role);
      });
    },
    logout() {
      this.commit("logout");
      router.go("/topics");
    },
    getPostsFromUser(userId) {
      axios.get("/posts/" + userId).then((response) => {
        if (response.status == 200) {
          this.commit("setPosts", response.data);
        } else {
          console.log(response);
        }
      });
    },
    getCommentsFromUser(userId) {
      axios.get("/comments/" + userId).then((response) => {
        if (response.status == 200) {
          this.commit("setComments", response.data);
        } else {
          console.log(response);
        }
      });
    },
    updateBoard(context, payload) {
      axios.put("/boards/" + payload[0], payload[1]).then((response) => {
        console.log(response);
      });
    },
    getUser(context, userId) {
      axios.get("/user/" + userId).then((response) => {
        if (response.status == 200) {
          this.commit("setUser", response.data);
        } else {
          console.log(response);
        }
      });
    },
    getPublicUser(context, userId) {
      axios.get("/user/public/" + userId).then((response) => {
        if (response.status == 200) {
          this.commit("setViewUser", response.data);
        } else {
          console.log(response);
        }
      });
    },
    getPublicUserByUsername(context, username) {
      axios.get("/user/publicByUsername/" + username).then((response) => {
        if (response.status == 200) {
          this.commit("setViewUser", response.data);
        } else {
          console.log(response);
        }
      });
    },
    getCommentsFromPost(context, id) {
      axios.get("/posts/" + id + "/comments").then((response) => {
        if (response.status == 200) {
          this.commit("setComments", response.data);
        } else {
          console.log(response);
        }
      });
    },
    addComment(context, comment) {
      axios.post("/post/addComment", comment).then((response) => {
        if (response.status == 200) {
          this.commit("addComment", response.data);
        } else {
          console.log(response);
        }
      });
    },
  },
  modules: {},
});
