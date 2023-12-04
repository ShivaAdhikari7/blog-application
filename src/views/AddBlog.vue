<template>
  <div>
    <div class="wrapper container">
      <h1>Add Blog</h1>
      <form @submit.prevent="onSubmitHandler">
        <div class="row">
          <div
            class="col-6 box"
            :class="{ 'box-error': $v.blogData.title.$error }"
          >
            <label for="title" class="aftercontent">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              v-model="blogData.title"
              @input="setTitle($event.target.value)"
            />
            <p
              class="error-message"
              v-if="!$v.blogData.title.required && $v.blogData.title.$error"
            >
              Please Enter the title
            </p>
          </div>

          <div
            class="col-6 box"
            :class="{ 'box-error': $v.blogData.category.$error }"
          >
            <label for="category" class="aftercontent">Category</label>
            <input
              type="text"
              id="category"
              placeholder="Enter category"
              v-model="blogData.category"
              @input="setCategory($event.target.value)"
            />
            <p
              v-if="
                !$v.blogData.category.required && $v.blogData.category.$error
              "
              class="error-message"
            >
              Please Select the status
            </p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-6 box"
            :class="{ 'box-error': $v.blogData.status.$error }"
          >
            <label for="status" class="aftercontent">Status</label>
            <select v-model="blogData.status" class="custom-select" id="status">
              <option value="" disabled>Select Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <p
              v-if="!$v.blogData.status.required && $v.blogData.status.$error"
              class="error-message"
            >
              Please Select the status
            </p>
          </div>
          <div
            class="col-6 box"
            :class="{ 'box-error': $v.blogData.status.$error }"
          >
            <label for="author" class="aftercontent">Author</label>
            <input
              type="text"
              id="author"
              placeholder="Enter Author Name"
              v-model="blogData.author"
              @input="setAuthor($event.target.value)"
            />
            <p
              v-if="!$v.blogData.author.required && $v.blogData.author.$error"
              class="error-message"
            >
              Please Select the status
            </p>
          </div>
        </div>
        <div
          class="box"
          :class="{ 'box-error': $v.blogData.description.$error }"
        >
          <label for="description" class="aftercontent">Description</label>
          <textarea
            id="description"
            placeholder="Enter description"
            rows="10"
            v-model="blogData.description"
            @input="setDescription($event.target.value)"
          ></textarea>
          <p
            v-if="
              !$v.blogData.description.required &&
                $v.blogData.description.$error
            "
            class="error-message"
          >
            Please Enter the description
          </p>
        </div>
        <button class="btn btn-submit btn-success" type="submit">
          Add Blog
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import AllBlogs from "./AllBlogs.vue";
import Modal from "../components/Modal.vue";
export default {
  name: "AddBlog",
  components: {
    AllBlogs,
    Modal
  },

  data() {
    return {
      blogData: {
        title: "",
        category: "",
        status: "",
        description: "",
        author: ""
      },
      data: [],
      recordToDeleteIndex: null,
      recordToEditIndex: null,
      isUpdating: false,
      isModalVisible: false
    };
  },

  mounted() {
    this.$v.$reset();
  },
  validations: {
    blogData: {
      title: {
        required
      },
      category: { required },
      status: {
        required
      },
      description: {
        required
      },
      author: { required }
    }
  },

  methods: {
    setTitle(value) {
      this.blogData.title = value;
      this.$v.blogData.title.$touch();
    },
    setAuthor(value) {
      this.blogData.author = value;
      this.$v.blogData.author.$touch();
    },

    setCategory(value) {
      this.blogData.category = value;
      this.$v.blogData.category.$touch();
    },

    setStatus(value) {
      this.blogData.status = value;
      this.$v.blogData.status.$touch();
    },

    setDescription(value) {
      this.blogData.description = value;
      this.$v.blogData.description.$touch();
    },
    showModal(index) {
      this.recordToDeleteIndex = index;
      this.isModalVisible = true;
    },

    saveDataToLocalStorage() {
      localStorage.setItem("blog_data", JSON.stringify(this.data));
    },

    clearForm() {
      this.blogData = {
        title: "",
        category: "",
        status: "",
        description: "",
        author: ""
      };
      this.$v.$reset();
    },
    onSubmitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Invalid");
      } else {
        const blogDataCopy = Object.assign({}, this.blogData);
        this.data.push(blogDataCopy);

        this.saveDataToLocalStorage();
        this.clearForm();
      }
    }
  }
};
</script>

<style scoped>
textarea {
  padding: 1.2rem;
}
</style>
