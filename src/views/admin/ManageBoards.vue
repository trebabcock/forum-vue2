<template>
  <div class="flex justify-center items-center w-full h-full">
    <div class="flex flex-col p-6 space-y-4 w-96 items-center">
      <input
        class="px-4 w-full py-2 bg-gray-800 rounded-lg outline-none hover:bg-gray-600 focus:bg-gray-600 shadow-lg"
        type="text"
        v-model="board_name"
        placeholder="Board Name"
      />
      <textarea
        class="p-4 w-full bg-gray-800 hover:bg-gray-600 rounded-lg outline-none focus:bg-gray-600 shadow-lg h-64"
        placeholder="Board Description"
        v-model="description"
      ></textarea>
      <div class="flex">
        <div
          class="rounded h-10 py-2 px-4 w-30 bg-gray-800 hover:bg-gray-600 cursor-pointer block shadow-lg"
          @click="createBoard()"
        >
          <span class="text-gray-50 block">Create Board</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col p-6 space-y-4 w-96 items-center">
      <div class="w-full">
        <Listbox v-model="selected_board">
          <div class="relative mt-1">
            <ListboxButton
              class="relative w-full py-2 pl-4 pr-10 text-left bg-gray-800 text-gray-50 hover:bg-gray-600 rounded-lg shadow-lg cursor-default focus:outline-none sm:text-sm"
            >
              <span class="block truncate">{{ selected_board.name }}</span>
              <span
                class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
              >
                <SelectorIcon
                  class="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute w-full p-1 mt-1 overflow-auto text-base bg-gray-900 text-gray-50 rounded-lg shadow-lg max-h-60 ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="board in boards"
                  :key="board.id"
                  :value="board"
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'bg-gray-700' : 'bg-transparent',
                      'cursor-default select-none rounded-lg relative py-2 pl-10 pr-4',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ board.name }}</span
                    >
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-50"
                    >
                      <CheckIcon class="w-5 h-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <input
        class="px-4 w-full py-2 bg-gray-800 rounded-lg outline-none hover:bg-gray-600 focus:bg-gray-600 shadow-lg"
        type="text"
        placeholder="Board Name"
        v-model="selected_board.name"
        id="board_name"
      />
      <textarea
        class="p-4 w-full bg-gray-800 hover:bg-gray-600 rounded-lg outline-none focus:bg-gray-600 shadow-lg h-64"
        placeholder="Board Description"
        v-model="selected_board.description"
        id="board_description"
      ></textarea>
      <div class="flex space-x-16">
        <div
          class="rounded h-10 px-4 py-1 flex items-center justify-center bg-gray-800 hover:bg-gray-600 cursor-pointer shadow-lg w-24"
          @click="updateBoard"
        >
          <span class="text-gray-50 font-bold text-lg">Save</span>
        </div>
        <div class="flex flex-grow h-10"></div>
        <div
          class="rounded h-10 px-4 py-1 flex items-center justify-center bg-gray-800 hover:bg-gray-600 cursor-pointer shadow-lg w-24"
          @click="openModal"
        >
          <span class="text-gray-50 font-bold text-lg">Delete</span>
        </div>
      </div>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal">
        <div class="fixed inset-0 z-10 overflow-y-auto">
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
              <DialogOverlay class="fixed inset-0" />
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
                class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform text-gray-50 bg-gray-900 shadow-xl rounded-lg"
              >
                <DialogTitle as="h3" class="text-lg font-medium leading-6">
                  Warning
                </DialogTitle>
                <div class="mt-2 flex flex-col space-y-2">
                  <p class="text-sm">
                    You are about to delete an entire board, including all posts
                    and comments. This cannot be undone. Are you sure you want
                    to delete this board?
                  </p>
                  <p class="text-sm">Board Name: {{ selected_board.name }}</p>
                </div>

                <div class="mt-4 flex space-x-4">
                  <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 hover:text-blue-800 border border-transparent rounded-md"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 bg-red-100 border border-transparent rounded-md hover:bg-red-200"
                    @click="deleteBoard"
                  >
                    Delete
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
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
export default {
  data() {
    return {
      board_name: null,
      description: null,
      selected_board: {},
    };
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  mounted() {
    this.selected_board = this.boards[0];
  },
  methods: {
    createBoard: function () {
      var board = { name: this.board_name, description: this.description };
      this.$store.dispatch("createBoard", board);
      this.$store.dispatch("fetchBoards");
    },
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.selected_board.id);
      var name_input = document.getElementById("board_name");
      var desc_input = document.getElementById("board_description");
      this.board_name = "";
      this.description = "";
      name_input.value = "";
      desc_input.value = "";
      this.selected_board = this.boards[0];
      this.closeModal();
    },
    updateBoard() {
      this.$store.dispatch("updateBoard", [
        this.selected_board.id,
        this.selected_board,
      ]);
    },
  },
  computed: {
    boards: function () {
      return this.$store.getters.getBoards;
    },
    selectedBoard() {
      return String(this.selected_board)["id"];
    },
  },
  setup() {
    const isOpen = ref(false);

    return {
      isOpen,
      closeModal() {
        isOpen.value = false;
      },
      openModal() {
        isOpen.value = true;
      },
    };
  },
};
</script>
