<template>
  <div
    class="flex space-x-4 items-center text-gray-50 cursor-pointer rounded-lg"
  >
    <Menu as="div" class="relative inline-block text-left w-full h-full">
      <div class="w-full h-full">
        <MenuButton
          class="inline-flex space-x-4 justify-center w-full p-4 text-sm font-medium hover:bg-gray-600 hover:shadow-lg rounded-lg"
        >
          <span class="text-lg font-bold">{{ user.username }}</span>
          <div class="w-7 h-7 rounded-full">
            <img
              class="object-fill rounded-full"
              src="https://images.iphonephotographyschool.com/24755/portrait-photography.jpg"
            />
          </div>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 w-56 mt-2 origin-top-right text-gray-50 bg-gray-900 divide-y divide-gray-800 rounded-lg shadow-lg"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-gray-700' : 'bg-transparent',
                  'group flex rounded-lg items-center w-full px-2 py-2 text-sm',
                ]"
                @click="toProfile"
              >
                <UserIcon
                  :active="active"
                  class="w-5 h-5 mr-2"
                  aria-hidden="true"
                />
                Profile
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-gray-700' : 'bg-transparent',
                  'group flex rounded-lg items-center w-full px-2 py-2 text-sm',
                ]"
                @click="toSettings"
              >
                <CogIcon
                  :active="active"
                  class="w-5 h-5 mr-2"
                  aria-hidden="true"
                />
                Settings
              </button>
            </MenuItem>
            <MenuItem v-if="isAdmin" v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-gray-700' : 'bg-transparent',
                  'group flex rounded-lg items-center w-full px-2 py-2 text-sm',
                ]"
                @click="toAdmin"
              >
                <LockClosedIcon
                  :active="active"
                  class="w-5 h-5 mr-2"
                  aria-hidden="true"
                />
                Administration
              </button>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-gray-700' : 'bg-transparent',
                  'group flex rounded-lg items-center w-full px-2 py-2 text-sm',
                ]"
                @click="logout"
              >
                <LogoutIcon
                  :active="active"
                  class="w-5 h-5 mr-2"
                  aria-hidden="true"
                />
                Sign Out
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  UserIcon,
  LogoutIcon,
  LockClosedIcon,
  CogIcon,
} from "@heroicons/vue/solid";

export default {
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    UserIcon,
    LogoutIcon,
    LockClosedIcon,
    CogIcon,
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout");
    },
    toAdmin: function () {
      this.$router.push("/admin");
    },
    toProfile: function () {
      this.$router.push("/user/" + this.$store.getters.getUser.username);
    },
    toSettings: function () {
      this.$router.push("/settings");
    },
  },
  computed: {
    user: function () {
      return this.$store.getters.getUser;
    },
    isAdmin: function () {
      return this.$store.getters.getUserRole === "admin";
    },
  },
};
</script>
