<template>
    <div>
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search chess masters..."
        class="input input-bordered"
        @input="emitSearchTerm"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    name: "FilterComponent",
    emits: ["update:searchTerm"],
  
    setup(_, { emit }) {
      const searchTerm = ref("");
  
      const emitSearchTerm = () => {
        emit("update:searchTerm", searchTerm.value);
      };
  
      return {
        searchTerm,
        emitSearchTerm,
      };
    },
  });
  </script>
  