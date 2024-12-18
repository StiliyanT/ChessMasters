<template>
    <!-- Add ChessMaster Modal -->
    <dialog id="addChessMasterModal" class="modal modal-bottom sm:modal-middle" ref="modalRef">
      <div class="modal-box">
        <h3 class="text-lg font-bold mb-4">
          {{ isEditMode ? "Edit Chess Master" : "Add New Chess Master" }}
        </h3>
        <!-- Form -->
        <form @submit.prevent="submitForm">
          <!-- Name Input -->
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              v-model="formData.name"
              placeholder="Enter name"
              class="input input-bordered"
              :disabled="isEditMode"
              required
            />
          </div>
  
          <!-- Image Link Input -->
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Image Link</span>
            </label>
            <input
              type="url"
              v-model="formData.image"
              placeholder="Enter image URL"
              class="input input-bordered"
              required
            />
          </div>
  
          <!-- Description Input -->
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea
              v-model="formData.description"
              placeholder="Enter description"
              class="textarea textarea-bordered"
              rows="4"
              required
            ></textarea>
          </div>
  
          <!-- Modal Action Buttons -->
          <div class="modal-action">
            <button type="submit" class="btn btn-primary">
              {{ isEditMode ? "Update" : "Create" }}
            </button>
            <button type="button" class="btn" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch, type PropType } from "vue";
  import type { ChessMaster } from "./object/ChessMasters";
  
  export default defineComponent({
    name: "AddChessMasterModal",
    emits: ["create", "update", "close"],
    props: {
      initialData: {
        type: Object as PropType<ChessMaster | null>,
        default: null,
      },
      isEditMode: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { emit }) {
      const formData = ref({
        name: "",
        image: "",
        description: "",
      });
  
      const modalRef = ref<HTMLDialogElement | null>(null);
  
      // Watch for changes in initialData and update formData
      watch(
        () => props.initialData,
        (newData) => {
          if (newData) {
            formData.value = { ...newData };
          }
        },
        { immediate: true, deep: true }
      );
  
      // Submit the form
      const submitForm = () => {
        if (!formData.value.name || !formData.value.image || !formData.value.description) {
          console.warn("All fields are required.");
          return;
        }
  
        if (props.isEditMode) {
          emit("update", { ...formData.value });
        } else {
          emit("create", { ...formData.value });
        }
  
        closeModal();
      };
  
      // Close the modal
      const closeModal = () => {
        emit("close");
        if (modalRef.value) {
          modalRef.value.close();
        }
      };
  
      // Open the modal
      const openModal = () => {
        if (modalRef.value) {
          modalRef.value.showModal();
          console.log("Modal opened successfully.");
        } else {
          console.error("Modal ref is not defined.");
        }
      };
  
      return {
        formData,
        submitForm,
        closeModal,
        openModal,
        modalRef,
      };
    },
  });
  </script>
  
  <style scoped>
  .modal {
    z-index: 9999 !important; /* Ensure it's on top of other elements */
  }
  </style>
  