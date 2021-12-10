<template>
  <div class="flex flex-wrap">
    <div class="w-full sm:w-6/12 md:w-4/12 px-4">
      <div class="relative inline-flex align-middle w-full">
        <div
          class="
            flex
            space-x-4
            items-center
            text-gray-50
            hover:bg-gray-600 hover:shadow-lg
            cursor-pointer
            p-4
            rounded-lg
          "
          v-on:click="toggleDropdown()"
          ref="btnDropdownRef"
        >
          <span class="text-lg font-bold">{{ user.username }}</span>
          <div class="w-7 h-7 rounded-full">
            <img
              class="object-fill rounded-full"
              src="https://images.iphonephotographyschool.com/24755/portrait-photography.jpg"
            />
          </div>
        </div>
        <div
          v-bind:class="{
            hidden: !dropdownPopoverShow,
            block: dropdownPopoverShow,
          }"
          class="
            bg-gray-800
            text-base
            z-50
            float-left
            py-2
            list-none
            text-left
            rounded-lg
            shadow-lg
            mt-1
            px-2
          "
          style="min-width: 12rem"
          ref="popoverDropdownRef"
        >
          <div
            @click="toProfile"
            class="
              text-gray-50 text-sm
              py-2
              px-4
              font-normal
              rounded-lg
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-grayGray-700
              cursor-pointer
              bg-gray-700
              hover:bg-gray-600
              my-2
              shadow-lg
            "
          >
            Profile
          </div>
          <div
            @click="toSettings"
            class="
              text-gray-50 text-sm
              py-2
              px-4
              font-normal
              rounded-lg
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-grayGray-700
              cursor-pointer
              bg-gray-700
              hover:bg-gray-600
              my-2
              shadow-lg
            "
          >
            Settings
          </div>
          <div
            v-if="isAdmin"
            @click="toAdmin"
            class="
              text-gray-50 text-sm
              py-2
              px-4
              font-normal
              rounded-lg
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-grayGray-700
              cursor-pointer
              bg-gray-700
              hover:bg-gray-600
              my-2
              shadow-lg
            "
          >
            Administration
          </div>

          <div
            class="
              h-0
              my-2
              border border-solid border-t-0 border-grayGray-800
              opacity-25
            "
          ></div>
          <div
            @click="logout()"
            class="
              text-gray-50 text-sm
              py-2
              px-4
              font-normal
              rounded-lg
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-grayGray-700
              cursor-pointer
              bg-gray-700
              hover:bg-gray-600
              shadow-lg
            "
          >
            Sign Out
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

export default {
  name: "dropdown",
  data() {
    return {
      dropdownPopoverShow: false,
    };
  },
  methods: {
    toggleDropdown: function () {
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom",
        });
      }
    },
    logout: function () {
      this.toggleDropdown();
      this.$store.dispatch("logout");
    },
    toAdmin: function () {
      this.toggleDropdown();
      this.$router.push("/admin");
    },
    toProfile: function () {
      this.toggleDropdown();
      this.$router.push("/user/" + this.$store.getters.getUser.username);
    },
    toSettings: function () {
      this.toggleDropdown();
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
