<template>
  <nav class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">Chess Masters</a>
    </div>
    <div class="flex-none">
      <!-- Input bound to searchTerm -->
      <input
        type="text"
        placeholder="Search..."
        class="input input-bordered"
        v-model="searchInput"
      />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Navbar",
  props: {
    searchTerm: {
      type: String,
      required: true,
    },
  },
  emits: ["update:searchTerm"],
  setup(props, { emit }) {
    const searchInput = ref(props.searchTerm);

    // Watch for input changes and emit back to parent
    watch(searchInput, (newValue) => {
      emit("update:searchTerm", newValue);
    });

    return { searchInput };
  },
});
</script>