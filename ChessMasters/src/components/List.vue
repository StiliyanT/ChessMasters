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
              <!-- Delete button -->
              <button class="btn btn-ghost btn-xs" @click.stop="deleteChessMaster(chessMaster.name)">
              Delete
            </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { type ChessMaster } from "./object/ChessMasters";
import axios from "axios";
// Define the type for a ChessMaster object

export default defineComponent({
  name: "ChessMasterList",
  props: {
    chessMasters: {
      type: Array as PropType<ChessMaster[]>,
      required: true,
    },
  },
  methods: {
    chessMasterClicked(chessMaster: ChessMaster) {
      this.$emit("chessMasterClicked", chessMaster);
    },
    // Method to delete a ChessMaster from the list
    async deleteChessMaster(chessMasterName: string) {
      try {
         // Send DELETE request to backend
         const response = await axios.delete(`http://localhost:3000/api/chessMasters/${chessMasterName}`);
        
        // Notify parent to update the list
        this.$emit("deleteChessMaster", chessMasterName);

        console.log('Delete Response:', response.data);
      } catch (error) {
        console.error("Error deleting ChessMaster:", error);
      }
    },
  },
  // setup(props) {
  //   // Props can be accessed directly in the template or within setup using `props.chessMasters`
  //   return {
  //     chessMasters: props.chessMasters,
  //   };
  // },
});
</script>