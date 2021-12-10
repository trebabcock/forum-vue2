import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/MainView.vue"),
    redirect: "/topics",
    children: [
      {
        path: "/topics",
        name: "Topics",
        component: () => import("../components/TopicList.vue"),
      },
      {
        path: "/topics/:id",
        name: "Topic",
        component: () => import("../views/Board.vue"),
      },
      {
        path: "/post/:id",
        name: "Post",
        component: () => import("../views/Post.vue"),
      },
      {
        path: "/settings",
        name: "Settings",
        beforeEnter: (to, from, next) => {
          if (store.getters.getLoggedIn) {
            next();
          } else {
            next("/login");
          }
        },
        redirect: "/settings/general",
        component: () => import("@/views/Settings/Settings.vue"),
        children: [
          {
            path: "general",
            name: "General Settings",
            component: () => import("@/views/Settings/GeneralSettings.vue"),
          },
          {
            path: "profile",
            name: "Profile Settings",
            component: () => import("@/views/Settings/ProfileSettings.vue"),
          },
          {
            path: "account",
            name: "Account Settings",
            component: () => import("@/views/Settings/AccountSettings.vue"),
          },
          {
            path: "security",
            name: "Security Settings",
            component: () => import("@/views/Settings/SecuritySettings.vue"),
          },
        ],
      },
      {
        path: "/admin",
        name: "Admin",
        component: () => import("../views/admin/Admin.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters.getUserRole === "admin") {
            next();
          } else {
            next("/topics");
          }
        },
        redirect: "/admin/dashboard",
        children: [
          {
            path: "dashboard",
            name: "Admin Dashboard",
            component: () => import("../views/admin/Dashboard.vue"),
          },
          {
            path: "manageUsers",
            name: "Create Users",
            component: () => import("../views/admin/ManageUsers.vue"),
          },
          {
            path: "manageBoards",
            name: "Manage Boards",
            component: () => import("../views/admin/ManageBoards.vue"),
          },
          {
            path: "siteSettings",
            name: "Site Settings",
            component: () => import("../views/admin/SiteSettings.vue"),
          },
        ],
      },
      {
        path: "/user/:username",
        name: "Profile",
        component: () => import("../views/Profile.vue"),
      },
      {
        path: "/board/:id/new",
        name: "Create Post",
        beforeEnter: (to, from, next) => {
          if (store.getters.getLoggedIn) {
            next();
          } else {
            next("/login");
          }
        },
        component: () => import("../views/CreatePost.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
