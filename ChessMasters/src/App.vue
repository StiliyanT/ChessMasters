

<template>

  <div>
    <Navbar/>
  </div>
  <div>
    <ChessMastersList :chessMasters="chessMastersList"/>
  </div>
  
  


</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/NavBar.vue';
import ChessMastersList from './components/List.vue';
import { defineComponent, ref } from "vue";
import chessMastersMock from "@/assets/data.json"

export default defineComponent({
  name: "App",
  components: {
    ChessMastersList,
    Navbar
  },
  setup() {
    // Use mock data from the JSON file
    const chessMastersList = chessMastersMock;

    return { chessMastersList };
  },
});
</script>
