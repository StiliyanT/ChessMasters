<template>
    <!-- Add ChessMaster Modal -->
    <dialog id="addChessMasterModal" class="modal modal-bottom sm:modal-middle" ref="modalRef">
      <div class="modal-box">
        <h3 class="text-lg font-bold mb-4">Add New Chess Master</h3>
        <!-- Form -->
        <form @submit.prevent="submitForm">
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input type="text" v-model="formData.name" placeholder="Enter name" class="input input-bordered" required />
          </div>
  
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Image Link</span>
            </label>
            <input type="url" v-model="formData.image" placeholder="Enter image URL" class="input input-bordered" required />
          </div>
  
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea v-model="formData.description" placeholder="Enter description" class="textarea textarea-bordered" rows="4" required></textarea>
          </div>
  
          <div class="modal-action">
            <button type="submit" class="btn btn-primary">Create</button>
            <button type="button" class="btn" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  
  export default defineComponent({
    name: "AddChessMasterModal",
    emits: ["create", "close"],
    setup(_, { emit }) {
      const formData = ref({
        name: "",
        image: "",
        description: "",
      });
  
      const modalRef = ref<HTMLDialogElement | null>(null);
  
      // Method to submit the form
      const submitForm = () => {
        emit("create", { ...formData.value });
        formData.value = { name: "", image: "", description: "" };
        closeModal();
      };
  
      // Method to close the modal
      const closeModal = () => {
        emit("close");
        if (modalRef.value) {
          modalRef.value.close();  // Close the modal programmatically
        }
      };
  
      // Method to open the modal
      const openModal = () => {
        console.log("modal checker")
        if (modalRef.value) {
          modalRef.value.showModal();
          console.log("modal opens")  // Open the modal programmatically
        }
      };
  
      onMounted(() => {
        if (modalRef.value) {
          modalRef.value.addEventListener("close", () => {
            console.log("Modal closed");  // You can add some debugging here
          });
        }
      });
  
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