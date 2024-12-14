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
          <tr v-for="(chessMaster, index) in chessMasters" :key="index" class="hover">
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
              <button class="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { type ChessMaster } from "./object/ChessMasters";
// Define the type for a ChessMaster object

export default defineComponent({
  name: "ChessMasterList",
  props: {
    chessMasters: {
      type: Array as PropType<ChessMaster[]>,
      required: true,
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