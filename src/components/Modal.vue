<template>
  <div class="backdrop">
    <div class="modal">
      <header class="modal-header">Confirm Deletion</header>
      <form @submit.prevent>
        <div class="modal-content">Are you sure you want to delete?</div>

        <div class="modal-footer">
          <button class="btn btn-danger btn-action" @click="close">
            Cancel
          </button>
          <button class="btn btn-success btn-action" @click="confirm">
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      console.log("Deleting");
      this.$emit("delete");
    }
  }
};
</script>
<style>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
.modal {
  display: flex;
  flex-direction: column;
  z-index: 100;
  position: fixed;
  top: 30vh;
  left: 22%;
  width: 40%;
  height: auto;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 8px;
}

.modal-header {
  width: 100%;
  padding: 1rem 0.5rem;
  background: #2a006e;
  color: white;
}

.modal-header h2 {
  margin: 0.5rem;
}

.modal-content {
  padding: 1rem 0.5rem;
}

.modal-footer {
  padding: 1rem 0.5rem;
}
.btn-action {
  font-size: 2rem;
}
</style>
