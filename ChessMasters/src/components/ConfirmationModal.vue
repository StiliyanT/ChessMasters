<template>
    <dialog id="confirmation_modal" class="modal modal-bottom sm:modal-middle" ref="modalRef">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{{ title }}</h3>
        <p class="py-4">{{ message }}</p>
        <div class="modal-action">
          <!-- Close button -->
          <form method="dialog">
            <button class="btn" @click="$emit('cancel')">Cancel</button>
          </form>
          <!-- Confirm button -->
          <button class="btn btn-error" @click="onConfirm">Confirm</button>
        </div>
      </div>
    </dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    name: "ConfirmationModal",
    props: {
      title: { type: String, default: "Confirm Action" },
      message: { type: String, required: true },
    },
    emits: ["confirm", "cancel"],
    setup(_, { emit }) {
      const modalRef = ref<HTMLDialogElement | null>(null);
  
      const showModal = () => {
        modalRef.value?.showModal();
      };
  
      const closeModal = () => {
        modalRef.value?.close();
      };
  
      const onConfirm = () => {
        emit("confirm");
        closeModal();
      };
  
      return { showModal, modalRef, closeModal, onConfirm };
    },
  });
  </script>
  