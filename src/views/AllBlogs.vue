<template>
  <div class="wrapper container">
    <h1>List Details</h1>
    <table>
      <thead>
        <tr>
          <th>SN</th>
          <th>Title</th>
          <th>Category</th>
          <th>Status</th>
          <th>Author</th>
          <th>Descritption</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in data" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ data.title }}</td>
          <td>{{ data.category }}</td>
          <td>{{ data.status }}</td>
          <td>{{ data.author }}</td>
          <td>{{ data.description }}</td>

          <td class="btn-table">
            <button
              class="btn btn-primary btn-action"
              @click="showUpdateModal(index, data)"
            >
              Edit
            </button>
            <button class="btn btn-danger btn-action" @click="showModal(index)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal v-show="isModalVisible">
      <template #header>
        <h1 class="modal-header">Confirm Deletion</h1>
      </template>

      <template #main>
        <p class="modal-content">Are you sure you want to delete?</p>
      </template>

      <template #footer>
        <button class="btn btn-danger btn-action" @click="closeModal">
          Cancel
        </button>
        <button class="btn btn-success btn-action" @click="deleteRecord">
          Confirm
        </button></template
      >
    </Modal>
    <UpdateModal
      :index="this.recordToUpdateIndex"
      :data="blogData"
      v-show="isUpdateModalVisible"
    >
      <template #header>
        <h1 class="modal-header">Update Blog Data</h1>
      </template>

      <template #footer>
        <button class="btn btn-danger btn-action" @click="closeModal">
          Cancel
        </button>
        <button class="btn btn-success btn-action" @click="updateRecord">
          Update
        </button></template
      >
    </UpdateModal>

    <p v-if="data.length === 0" class="table-text">
      No any data to display. Please add some.
    </p>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import AddBlog from "./AddBlog.vue";
import UpdateModal from "../components/UpdateModal.vue";
export default {
  name: "AllBlogs",
  components: {
    Modal,
    AddBlog,
    UpdateModal
  },
  data() {
    return {
      msg: "This is All Blogs Page",
      data: [],
      isModalVisible: false,
      isUpdateModalVisible: false,
      recordToDeleteIndex: null,
      recordToUpdateIndex: null,
      blogData: {}
    };
  },
  mounted() {
    this.loadDataFromLocalStorage();
  },

  methods: {
    showModal(index) {
      console.log(index);
      this.recordToDeleteIndex = index;
      this.isModalVisible = true;
      console.log("Showing modal");
    },
    updateRecord() {
      this.isUpdateModalVisible = false;
      console.log(index);
      console.log("Updating Record");
    },
    showUpdateModal(index, data) {
      this.recordToUpdateIndex = index;
      this.isUpdateModalVisible = true;
      this.blogData = data;
      // console.log(`Update Modal`, index, data);
    },
    closeModal() {
      this.isModalVisible = false;
      this.isUpdateModalVisible = false;
      console.log("Closing modal");
    },
    loadDataFromLocalStorage() {
      const savedData = localStorage.getItem("blog_data");
      if (savedData) {
        this.data = JSON.parse(savedData);
      }
    },
    deleteRecord() {
      if (this.recordToDeleteIndex !== null) {
        this.data.splice(this.recordToDeleteIndex, 1);
        this.recordToDeleteIndex = null;
        this.closeModal();
        this.saveDataToLocalStorage();
      }
    },
    saveDataToLocalStorage() {
      localStorage.setItem("blog_data", JSON.stringify(this.data));
    }
  }
};
</script>

<style>
.modal-header {
  width: 100%;
  padding: 1rem 0.5rem;
  background: #2a006e;
  color: white;
}

.modal-content {
  padding: 1rem 0.5rem;
}
</style>
