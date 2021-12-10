<template>
  <div class="h-screen w-screen flex flex-col bg-gray-900 text-gray-50">
    <div class="bg-transparent w-full h-full p-2">
      <div
        class="w-full flex justify-center items-center h-full bg-gray-700 rounded-lg"
      >
        <div
          class="w-64 h-80 flex flex-col space-y-4 items-center justify-center p-4"
        >
          <span class="text-2xl font-bold">Sign Up</span>

          <form
            class="flex flex-col justify-center items-center space-y-4 w-full"
            id="register"
            @submit.prevent="handleRegister"
          >
            <input
              class="rounded-lg outline-none w-full h-10 px-2 py-1 bg-gray-800 hover:bg-gray-600 focus:bg-gray-600 shadow-lg"
              type="text"
              placeholder="Username"
              id="username"
              v-model="username"
            />
            <input
              class="rounded-lg outline-none w-full h-10 px-2 py-1 bg-gray-800 hover:bg-gray-600 focus:bg-gray-600 shadow-lg"
              type="text"
              placeholder="Email"
              id="email"
              v-model="email"
            />
            <input
              class="rounded-lg outline-none w-full h-10 px-2 py-1 bg-gray-800 hover:bg-gray-600 focus:bg-gray-600 shadow-lg"
              type="password"
              placeholder="Password"
              id="password"
              v-model="password"
            />
            <input
              class="rounded-lg outline-none w-full h-10 px-2 py-1 bg-gray-800 hover:bg-gray-600 focus:bg-gray-600 shadow-lg"
              type="password"
              placeholder="Confirm Password"
              id="confirm_password"
              v-model="confirm_password"
            />
            <input
              class="rounded-lg h-10 px-4 py-1 flex items-center justify-center shadow-lg bg-gray-800 hover:bg-gray-600 cursor-pointer"
              type="submit"
              id="submit"
              name="submit"
              value="Sign Up"
            />

            <div class="flex space-x-2 items-center justify-center">
              <Switch
                v-model="tanc"
                :class="tanc ? 'bg-indigo-500' : 'bg-gray-50'"
                class="relative inline-flex flex-shrink-0 h-4 w-4 shadow-lg border-transparent rounded cursor-pointer transition-colors ease-in-out duration-200 outline-none"
              >
                <span class="sr-only">Terms and Conditions</span>
                <span
                  aria-hidden="true"
                  :class="tanc ? 'translate-x-9' : 'translate-x-0'"
                  class="pointer-events-none inline-block rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"
                />
              </Switch>
              <span class="text-xs text-gray-400"
                >I have read and agree to the
                <router-link to="/topics" class="text-indigo-400"
                  >Terms & Conditions</router-link
                ></span
              >
            </div>
            <div class="flex space-x-2 items-center justify-center">
              <Switch
                v-model="pp"
                :class="pp ? 'bg-indigo-500' : 'bg-gray-50'"
                class="relative inline-flex flex-shrink-0 h-4 w-4 shadow-lg border-transparent rounded cursor-pointer transition-colors ease-in-out duration-200 outline-none"
              >
                <span class="sr-only">Privacy Policy</span>
                <span
                  aria-hidden="true"
                  :class="pp ? 'translate-x-9' : 'translate-x-0'"
                  class="pointer-events-none inline-block rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"
                />
              </Switch>
              <span class="text-xs text-gray-400"
                >I have read and agree to the
                <router-link to="/topics" class="text-indigo-400"
                  >Privacy Policy</router-link
                ></span
              >
            </div>
          </form>
          <span class="text-xs text-gray-400"
            >Already signed up? Sign in
            <router-link class="text-indigo-400" to="/login"
              >here.</router-link
            ></span
          >
        </div>
      </div>
    </div>

    <TransitionRoot
      :show="isOpen"
      enter="duration-300 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div
        v-if="isOpen"
        class="w-full h-full bg-gray-900 bg-opacity-80 z-10 fixed inset-0"
      ></div>
    </TransitionRoot>

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal">
        <div class="fixed inset-0 z-20 overflow-y-auto">
          <div class="min-h-screen px-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="w-screen h-screen fixed inset-0" />
            </TransitionChild>

            <span class="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div
                class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-900 text-gray-50 rounded-lg"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-red-500"
                >
                  Please address the following errors:
                </DialogTitle>
                <div class="mt-4 flex flex-col space-y-2">
                  <div
                    v-for="error in errors"
                    :key="error"
                    class="items-center flex space-x-2"
                  >
                    <ExclamationCircleIcon
                      class="w-5 h-5 text-red-500 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <p class="text-sm text-gray-400 break-words">
                      {{ error }}
                    </p>
                  </div>
                </div>

                <div class="mt-6">
                  <button
                    type="button"
                    class="rounded-lg h-10 px-4 py-1 flex items-center justify-center shadow-lg bg-gray-800 hover:bg-gray-700"
                    @click="closeModal"
                  >
                    Okay
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import {
  Switch,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";
import { ExclamationCircleIcon } from "@heroicons/vue/solid";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      errors: [],
      tanc: false,
      pp: false,
      isOpen: false,
    };
  },
  components: {
    Switch,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
    ExclamationCircleIcon,
  },
  methods: {
    handleRegister: function (e) {
      if (this.password != this.confirm_password) {
        this.errors.push("Password do not match.");
      }
      if (this.password.length < 8) {
        this.errors.push("Password must contain at least 8 characters.");
      }
      if (this.password.length >= 100) {
        this.errors.push("Password must contain less than 100 characters.");
      }
      if (this.username.length < 1) {
        this.errors.push("Username must contain at least 1 character.");
      }
      if (this.username.length > 20) {
        this.errors.push("Username cannot contain more than 20 characters.");
      }
      if (
        !String(this.email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        this.errors.push("You must enter a valid email address.");
      }
      if (!this.tanc || !this.pp) {
        this.errors.push(
          "You must agree to both the Terms & Conditions and the Privacy Policy."
        );
      }
      if (this.errors.length > 0) {
        this.openModal();
        return;
      }
      var user = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch("handleRegister", user);
      e.preventDefault();
    },
    closeModal() {
      this.isOpen = false;
      this.errors = [];
    },
    openModal() {
      this.isOpen = true;
    },
  },
  mounted() {
    if (this.$store.getters.getLoggedIn) {
      this.$router.push("/");
    }
  },
};
</script>
