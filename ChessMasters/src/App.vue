

<template>

  <div>
    <Navbar 
    v-model:searchTerm="searchTerm" 
    @openAddModal="showAddModal = true"
    />
   
    <ChessMastersList 
      :chessMasters="filteredChessMasters" 
      @chessMasterClicked="showCard"
      @updateChessMaster="editChessMaster"
      @deleteChessMaster="removeChessMaster"
    />
    
    <ChessMasterCard
      v-if="showCardModal"
      :image="selectedChessMaster.image"
      :name="selectedChessMaster.name"
      :description="selectedChessMaster.description"
      :showCardModal="showCardModal"
      @close="closeCard"
    />

    <AddChessMasterModal
      v-if="showAddModal"
      :initialData="editableChessMaster"
      :isEditMode="editMode"
      @create="addChessMaster"
      @update="saveEditedChessMaster"
      @close="showAddModal = false"
      ref="addModalRef" 
    />
  </div>
</template>

<script lang="ts">
import Navbar from './components/NavBar.vue';
import ChessMastersList from './components/List.vue';
import { defineComponent, ref, computed, onMounted, watch, nextTick } from "vue";
import chessMastersData from "./backend/data/data.json"
import type { ChessMaster } from './components/object/ChessMasters';
import ChessMasterCard from './components/ChessMasterCard.vue';
import AddChessMasterModal from './components/AddChessMasterModal.vue';
import axios from "axios";

export default defineComponent({
  name: "App",
  components: {
    ChessMastersList,
    Navbar,
    ChessMasterCard,
    AddChessMasterModal,
  },
  setup() {
    // Use mock data from the JSON file
    const chessMastersList: ChessMaster[] = chessMastersData;
    const searchTerm = ref("");
    const chessMasters = ref<ChessMaster[]>(chessMastersList);
    const showAddModal = ref(false);
    // Modal visibility and selected chess master data
    const showCardModal = ref(false);
    console.log('showAddModal value:', showAddModal.value);
    const selectedChessMaster = ref<ChessMaster>({ image: '', name: '', description: '' });

    const addModalRef = ref<InstanceType<typeof AddChessMasterModal> | null>(null);


      // Watch `showAddModal` to call `openModal` on change
      watch(() => showAddModal.value, async (newValue) => {
  console.log("showAddModal changed:", newValue);
  if (newValue) {
    // Wait for the DOM to be updated before trying to access addModalRef
    await nextTick();
    console.log("addModalRef:", addModalRef.value); // Debugging line
    if (addModalRef.value) {
      addModalRef.value.openModal(); // Open the modal when showAddModal becomes true
    }
  }
});
    
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
      console.log('showAddModal value:', showAddModal.value);
    };

    // Method to close the card modal
    const closeCard = () => {
      showCardModal.value = false;
    };

   const addChessMaster = async (newChessMaster: ChessMaster) => {
      try {
        const response = await axios.post("http://localhost:3000/api/chessMasters", newChessMaster);
        console.log("Added chess master:", response.data);
        chessMasters.value.push(newChessMaster); // Optimistically update the list
        showAddModal.value = false;
      } catch (error) {
        console.error("Error adding chess master:");
      }
    };

    // Fetch chess masters from the backend
    const fetchChessMasters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/chessMasters");
        chessMasters.value = response.data; // Update chessMasters with the fetched data
      } catch (error) {
        console.error("Error fetching chess masters:", error);
        // Optionally, handle the error and keep the mock data as fallback
      }
    };

    const editMode = ref(false); // Track whether the modal is in edit mode
    const editableChessMaster = ref<ChessMaster | null>(null); // The chess master being edited
    
    const editChessMaster = (chessMaster: ChessMaster) => {
      editableChessMaster.value = { ...chessMaster }; // Clone the chess master to avoid direct mutation
      showAddModal.value = true;
      editMode.value = true;
    };

    const saveEditedChessMaster = async (updatedChessMaster: ChessMaster) => {
      try {
        await axios.put("http://localhost:3000/api/chessMasters", updatedChessMaster);

        // Update the local data
        const index = chessMasters.value.findIndex(cm => cm.name === updatedChessMaster.name);
        if (index !== -1) {
          chessMasters.value[index] = updatedChessMaster;
        }

        showAddModal.value = false;
        editMode.value = false;
        editableChessMaster.value = null;
      } catch (error) {
        console.error("Error updating chess master:", error);
      }
    };
    
    
    // Remove a chess master from the list (after successful deletion)
    // Remove a chess master from the list (after successful deletion)
    const removeChessMaster = (chessMasterName: string) => {
      // Send a DELETE request to the server
      axios
        .delete(`http://localhost:3000/api/chessMasters/${chessMasterName}`)
        .then(() => {
          // Filter out the deleted chess master from the list
          chessMasters.value = chessMasters.value.filter(
            (chessMaster) => chessMaster.name !== chessMasterName
          );
        })
        .catch((error) => {
          console.error("Error deleting chess master:", error);
        });
      };
    // Initial fetch of chess masters
    onMounted(fetchChessMasters);

    return { 
      chessMastersList,
      searchTerm,
      chessMasters,
      filteredChessMasters,
      showCardModal,
      showAddModal,
      selectedChessMaster,
      editMode,
      editableChessMaster,
      addChessMaster,
      removeChessMaster,
      showCard,
      closeCard,
      editChessMaster,
      saveEditedChessMaster,
      addModalRef
     };
  },
});
</script>
