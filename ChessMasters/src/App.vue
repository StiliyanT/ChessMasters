

<template>

  <div>
    <Navbar :searchTerm="searchTerm" @update:searchTerm="onSearchTermUpdate" />
    <div class="p-4">
      <ChessMastersList :chessMasters="filteredChessMasters"/>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from './components/NavBar.vue';
import ChessMastersList from './components/List.vue';
import { defineComponent, ref, computed } from "vue";
import chessMastersMock from "@/assets/data.json"
import type { ChessMaster } from './components/object/ChessMasters';

export default defineComponent({
  name: "App",
  components: {
    ChessMastersList,
    Navbar
  },
  setup() {
    // Use mock data from the JSON file
    const chessMastersList: ChessMaster[] = chessMastersMock;
    const searchTerm = ref("");

    // Compute filtered list based on the search term
    const filteredChessMasters = computed(() => {
      if (!searchTerm.value.trim()) return chessMastersList;
      const lowerSearchTerm = searchTerm.value.toLowerCase();
      return chessMastersList.filter((chessMaster) =>
        chessMaster.name.toLowerCase().includes(lowerSearchTerm) ||
        chessMaster.description.toLowerCase().includes(lowerSearchTerm)
      );
    });

    // Update the search term
    const onSearchTermUpdate = (value: string) => {
      searchTerm.value = value;
    };

    return { 
      chessMastersList,
      searchTerm,
      filteredChessMasters,
      onSearchTermUpdate, };
  },
});
</script>
