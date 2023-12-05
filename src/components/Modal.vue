<template>
  <div class="backdrop">
    <div class="modal">
      <slot class="modal-header" name="header"></slot>

      <form @submit.prevent>
        <slot class="modal-content" name="main"></slot>

        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal"
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
