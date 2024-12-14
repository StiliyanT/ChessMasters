<template>
    <div v-if="showCardModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div class="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img :src="image" :alt="`Image of ${name}`" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ name }}</h2>
          <p>{{ description }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="closeCard">Close</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import type { PropType } from "vue";
  import type  { ChessMaster } from "./object/ChessMasters";
  
  export default defineComponent({
    name: "ChessMastersCard",
    props: {
      image: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      showCardModal: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      closeCard() {
        this.$emit("close");
      },
    },
  });
  </script>
  
  <style scoped>
  .card {
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .card-actions {
    margin-top: 20px;
  }
  
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
  }
  
  .bg-gray-800 {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .bg-opacity-50 {
    background-opacity: 0.5;
  }
  
  .z-50 {
    z-index: 50;
  }
  </style>
  