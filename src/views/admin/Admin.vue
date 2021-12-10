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
      <span class="text-xl font-bold tracking-widest mb-6 uppercase">
        Admin
      </span>
      <SettingsNavItem route="/admin/dashboard">Dashboard</SettingsNavItem>
      <SettingsNavItem route="/admin/manageUsers">Manage Users</SettingsNavItem>
      <SettingsNavItem route="/admin/manageBoards"
        >Manage Boards</SettingsNavItem
      >
      <SettingsNavItem route="/admin/siteSettings"
        >Site Settings</SettingsNavItem
      >
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
