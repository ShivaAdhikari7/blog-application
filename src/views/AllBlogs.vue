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
              @click="showUpdateModal(index)"
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

    <Modal v-show="isModalVisible" @close="closeModal" @delete="deleteRecord" />
    <p v-if="data.length === 0" class="table-text">
      No any data to display. Please add some.
    </p>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
export default {
  name: "AllBlogs",
  components: {
    Modal
  },
  data() {
    return {
      msg: "This is All Blogs Page",
      data: [],
      isModalVisible: false,
      isUpdateModalVisible: false,
      recordToDeleteIndex: null,
      recordToUpdateIndex: null
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
    showUpdateModal(index) {
      this.recordToUpdateIndex = index;
      this.isUpdateModalVisible = true;
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
        console.log(this.data);
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

<style></style>
