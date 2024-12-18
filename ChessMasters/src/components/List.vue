<template>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- Dynamic Rows -->
          <tr v-for="(chessMaster, index) in chessMasters" :key="index"  @click="chessMasterClicked(chessMaster)" class="hover">
            <td>
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img :src="chessMaster.image" :alt="`Image of ${chessMaster.name}`" />
                </div>
              </div>
            </td>
            <td>{{ chessMaster.name }}</td>
            <td>{{ chessMaster.description }}</td>
            <th>
              <button class="btn btn-ghost btn-xs" @click="chessMasterClicked(chessMaster)">Details</button>
               <!-- Update Button -->
              <button class="btn btn-primary btn-xs" @click="emitUpdate(chessMaster)">Update</button>
              <!-- Delete button -->
              <button class="btn btn-error btn-xs" @click="openDeleteModal(chessMaster)" @click.stop="openDeleteModal(chessMaster)">
              Delete
            </button>
            </th>
          </tr>
        </tbody>
      </table>
      <ConfirmationModal
      ref="confirmationModal"
      title="Delete Confirmation"
      :message="`Are you sure you want to delete '${chessMasterToDelete?.name}'?`"
      @confirm="confirmDelete"
      @cancel="chessMasterToDelete = null"
    />
    </div>
  </template>

<script lang="ts">
import { defineComponent, ref, type PropType } from "vue";
import { type ChessMaster } from "./object/ChessMasters";
import ConfirmationModal from "./ConfirmationModal.vue";
import axios from "axios";
// Define the type for a ChessMaster object

export default defineComponent({
  name: "ChessMasterList",
  components: {
    ConfirmationModal,
  },
  props: {
    chessMasters: {
      type: Array as PropType<ChessMaster[]>,
      required: true,
    },
  },
  emits: ["deleteChessMaster", "updateChessMaster", "chessMasterClicked"],
  setup(_, { emit }) {
    const confirmationModal = ref<InstanceType<typeof ConfirmationModal> | null>(
      null
    );
    const chessMasterToDelete = ref<ChessMaster | null>(null);

    // Open modal for confirmation
    const openDeleteModal = (chessMaster: ChessMaster) => {
      chessMasterToDelete.value = chessMaster;
      confirmationModal.value?.showModal();
    };

    // Confirm and delete the ChessMaster
    const confirmDelete = async () => {
      if (chessMasterToDelete.value) {
        try {
          // Send DELETE request to backend
          await axios.delete(
            `http://localhost:3000/api/chessMasters/${chessMasterToDelete.value.name}`
          );

          // Notify parent to update the list
          emit("deleteChessMaster", chessMasterToDelete.value.name);
          console.log(
            `Successfully deleted ChessMaster: ${chessMasterToDelete.value.name}`
          );
        } catch (error) {
          console.error("Error deleting ChessMaster:", error);
        } finally {
          // Clear selection
          chessMasterToDelete.value = null;
        }
      }
    };

    const chessMasterClicked = (chessMaster: ChessMaster) => {
      emit("chessMasterClicked", chessMaster);
    };

    // Emit event for updating a chess master
    const emitUpdate = (chessMaster: ChessMaster) => {
      emit("updateChessMaster", chessMaster);
    };

    return {
      confirmationModal,
      chessMasterToDelete,
      openDeleteModal,
      confirmDelete,
      chessMasterClicked,
      emitUpdate
    };
  },
});
</script>