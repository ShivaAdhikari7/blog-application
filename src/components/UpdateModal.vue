<template>
  <div class="backdrop">
    <div class="modal">
      <slot class="modal-header" name="header"></slot>

      <form @submit.prevent>
        <div class="modal-content">
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
              <select
                v-model="blogData.status"
                class="custom-select"
                id="status"
              >
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
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="btn btn-submit btn-success" type="submit">
              Add Blog
            </button>
          </slot>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "UpdateModal",
  props: ["index", "data"],
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
    this.blogData = this.data;
    // this.$v.$reset();
    // console.log(this.data);
    // const { author, category, description, status, title } = this.data[0];
    // this.blogData = {
    //   title: title,
    //   category: category,
    //   status: status,
    //   description: description,
    //   author: author
    // };
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
    printData() {
      console.log(index, data);
    },
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

<style>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal {
  display: flex;
  flex-direction: column;
  z-index: 100;
  position: fixed;
  top: 0vh;
  left: 15%;
  width: 70%;
  height: auto;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 8px;
}
textarea {
  padding: 1.2rem;
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
  border: none;
  background-color: aliceblue;
}

.modal-footer {
  padding: 1rem 0.5rem;
}
.btn-action {
  font-size: 2rem;
}
form {
  padding: 0rem 1rem;
}
</style>
