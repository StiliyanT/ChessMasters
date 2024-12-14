<template>
  <nav class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">Chess Masters</a>
    </div>
    <div class="flex-none">
      <!-- Inject the FilterComponent here -->
      <FilterComponent @update:searchTerm="emitSearchTerm" />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import FilterComponent from "./FilterComponent.vue";

export default defineComponent({
  name: "Navbar",
  components: { FilterComponent },
  emits: ["update:searchTerm"],

  setup(_, { emit }) {
    const emitSearchTerm = (searchTerm: string) => {
      emit("update:searchTerm", searchTerm);
    };

    return {
      emitSearchTerm,
    };
  },
});
</script>