

<template>

  <div>
    <Navbar v-model:searchTerm="searchTerm" />
   
    <ChessMastersList :chessMasters="filteredChessMasters" @chessMasterClicked="showCard"/>
    
    <ChessMasterCard
      v-if="showCardModal"
      :image="selectedChessMaster.image"
      :name="selectedChessMaster.name"
      :description="selectedChessMaster.description"
      :showCardModal="showCardModal"
      @close="closeCard"
    />
  </div>
</template>

<script lang="ts">
import Navbar from './components/NavBar.vue';
import ChessMastersList from './components/List.vue';
import { defineComponent, ref, computed } from "vue";
import chessMastersMock from "@/assets/data.json"
import type { ChessMaster } from './components/object/ChessMasters';
import ChessMasterCard from './components/ChessMasterCard.vue';

export default defineComponent({
  name: "App",
  components: {
    ChessMastersList,
    Navbar,
    ChessMasterCard,
  },
  setup() {
    // Use mock data from the JSON file
    const chessMastersList: ChessMaster[] = chessMastersMock;
    const searchTerm = ref("");
    const chessMasters = ref(chessMastersList);

    // Modal visibility and selected chess master data
    const showCardModal = ref(false);
    const selectedChessMaster = ref<ChessMaster>({ image: '', name: '', description: '' });

    // Computed property to filter chess masters based on the search term
    const filteredChessMasters = computed(() => {
      if (!searchTerm.value.trim()) {
        return chessMasters.value;
      }

      const lowerSearchTerm = searchTerm.value.toLowerCase();
      return chessMasters.value.filter(
        (chessMaster) =>
          chessMaster.name.toLowerCase().includes(lowerSearchTerm) ||
          chessMaster.description.toLowerCase().includes(lowerSearchTerm)
      );
    });

    // Method to handle click on a chess master and open the card
    const showCard = (chessMaster: ChessMaster) => {
      selectedChessMaster.value = chessMaster;
      showCardModal.value = true;
    };

    // Method to close the card modal
    const closeCard = () => {
      showCardModal.value = false;
    };

    return { 
      chessMastersList,
      searchTerm,
      filteredChessMasters,
      showCardModal,
      selectedChessMaster,
      showCard,
      closeCard,
     };
  },
});
</script>
