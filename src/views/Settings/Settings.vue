<template>
  <div class="flex w-full h-full">
    <div
      class="
        flex flex-col
        w-48
        h-full
        items-center
        bg-gray-800
        rounded-lg
        shadow-lg
        p-6
        space-y-2
      "
    >
      <span
        class="text-xl font-bold tracking-widest mb-6 uppercase"
        to="/topics"
      >
        Settings
      </span>
      <SettingsNavItem route="/settings/general">General</SettingsNavItem>
      <SettingsNavItem route="/settings/profile">Profile</SettingsNavItem>
      <SettingsNavItem route="/settings/account">Account</SettingsNavItem>
      <SettingsNavItem route="/settings/security">Security</SettingsNavItem>
    </div>
    <div class="flex flex-grow h-full">
      <router-view />
    </div>
  </div>
</template>

<script>
import SettingsNavItem from "@/components/SettingsNavItem.vue";
export default {
  components: {
    SettingsNavItem,
  },
};
</script>
