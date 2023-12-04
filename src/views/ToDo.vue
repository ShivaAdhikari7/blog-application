<template>
  <div>
    <div class="wrapper container">
      <h1>Personal Form</h1>
      <form @submit.prevent="onSubmitHandler">
        <div class="row">
          <div
            class="col-6 box"
            :class="{ 'box-error': $v.formData.firstName.$error }"
          >
            <label for="firstName" class="aftercontent">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter firstname"
              v-model="formData.firstName"
              @input="setfirstName($event.target.value)"
            />
            <p
              class="error-message"
              v-if="
                !$v.formData.firstName.required && $v.formData.firstName.$error
              "
            >
              Please Enter your firstName
            </p>
          </div>

          <div class="col-6 box">
            <label for="midddleName">Middle Name</label>
            <input
              type="text"
              id="middleName"
              placeholder="Enter Middle Name"
              v-model="formData.middleName"
              @input="setMiddleName($event.target.value)"
            />
          </div>
        </div>
        <div class="row">
          <div
            class="col-6 box"
            :class="{ 'box-error': $v.formData.lastName.$error }"
          >
            <label for="lastName" class="aftercontent">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              v-model="formData.lastName"
              @input="setLastName($event.target.value)"
            />
            <p
              v-if="
                !$v.formData.lastName.required && $v.formData.lastName.$error
              "
              class="error-message"
            >
              Please Enter your lastName
            </p>
          </div>

          <div
            class="col-6 box"
            :class="{ 'box-error': $v.formData.gender.$error }"
          >
            <label for="gender" class="aftercontent">Gender</label>
            <select
              v-model="formData.gender"
              @change="setGender($event.target.value)"
              class="custom-select"
              id="gender"
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <p
              v-if="!$v.formData.gender.required && $v.formData.gender.$error"
              class="error-message"
            >
              Please Select your gender
            </p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-6 box"
            :class="{ 'box-error': $v.formData.dob.$error }"
          >
            <label for="date" class="aftercontent">DOB</label>
            <input
              type="date"
              id="date"
              placeholder="mm//dd//yy"
              v-model="formData.dob"
              @input="setDob($event.target.value)"
            />
            <p
              v-if="!$v.formData.dob.required && $v.formData.dob.$error"
              class="error-message"
            >
              Please Enter your DOB.
            </p>
          </div>

          <div
            class="col-6 box"
            :class="{ 'box-error': $v.formData.address.$error }"
          >
            <label for="address" class="aftercontent">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              v-model="formData.address"
              @input="setAddress($event.target.value)"
            />
            <p
              v-if="!$v.formData.address.required && $v.formData.address.$error"
              class="error-message"
            >
              Please Enter your Address
            </p>
          </div>
        </div>
        <div class="row">
          <div
            class="col-6 box"
            :class="{ 'box-error': $v.formData.postal.$error }"
          >
            <label for="pcode" class="aftercontent">Postal Code</label>
            <input
              type="number"
              id="pcode"
              placeholder="Enter Postal Code"
              v-model="formData.postal"
              @input="setPostal($event.target.value)"
            />
            <p
              v-if="!$v.formData.postal.required && $v.formData.postal.$error"
              class="error-message"
            >
              Please Enter your Postal Code
            </p>
            <p
              v-if="!$v.formData.postal.minLength && $v.formData.postal.$error"
              class="error-message"
            >
              Should have more than 5 numbers.
            </p>
          </div>
        </div>
        <button
          v-if="isUpdating"
          class="btn btn-submit btn-success"
          type="submit"
        >
          Update Data
        </button>
        <button
          v-else="isUpdating"
          class="btn btn-submit btn-success"
          type="submit"
        >
          Add Data
        </button>
      </form>
    </div>
    <div class="wrapper container">
      <h1>List Details</h1>
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>FirstName</th>
            <th>MiddleName</th>
            <th>LastName</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in informations" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ data.firstName }}</td>
            <td>{{ data.middleName }}</td>
            <td>{{ data.lastName }}</td>
            <td>{{ data.gender }}</td>
            <td>{{ data.dob }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.postal }}</td>
            <td class="btn-table">
              <button
                class="btn btn-primary btn-action"
                @click="updateRecord(index)"
              >
                Edit
              </button>
              <button
                class="btn btn-danger btn-action"
                @click="showModal(index)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Modal
        v-show="isModalVisible"
        @close="closeModal"
        @delete="deleteRecord"
      />
      <p v-if="informations.length === 0" class="table-text">
        No any data to display. Please add some.
      </p>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Modal from "../components/Modal.vue";
export default {
  name: "Todo",
  components: {
    Modal
  },

  data() {
    return {
      formData: {
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dob: "",
        address: "",
        postal: ""
      },
      informations: [],
      isModalVisible: false,
      recordToDeleteIndex: null,
      isUpdating: false,
      recordToEditIndex: null,
      updateFormData: {}
    };
  },
  mounted() {
    this.loadDataFromLocalStorage();
    this.$v.$reset();
  },
  validations: {
    formData: {
      firstName: {
        required
      },
      middleName: {},

      lastName: {
        required
      },
      dob: {
        required
      },
      gender: {
        required
      },
      address: {
        required
      },
      postal: {
        required,
        minLength: minLength(5)
      }
    }
  },
  methods: {
    setfirstName(value) {
      this.firstName = value;
      this.$v.formData.firstName.$touch();
    },
    setMiddleName(value) {
      this.middleName = value;
    },
    setLastName(value) {
      this.lastName = value;
      this.$v.formData.lastName.$touch();
    },
    setGender(value) {
      this.gender = value;
      this.$v.formData.gender.$touch();
    },
    setDob(value) {
      this.dob = value;
      this.$v.formData.dob.$touch();
    },
    setAddress(value) {
      this.address = value;
      this.$v.formData.address.$touch();
    },
    setPostal(value) {
      this.postal = value;
      this.$v.formData.postal.$touch();
    },
    showModal(index) {
      console.log(index);
      this.recordToDeleteIndex = index;
      this.isModalVisible = true;
      console.log("Showing modal");
    },
    loadDataFromLocalStorage() {
      const savedData = localStorage.getItem("form_data");
      if (savedData) {
        this.informations = JSON.parse(savedData);
      }
    },
    saveDataToLocalStorage() {
      localStorage.setItem("form_data", JSON.stringify(this.informations));
    },
    closeModal() {
      this.isModalVisible = false;
      console.log("Closing modal");
    },
    deleteRecord() {
      if (this.recordToDeleteIndex !== null) {
        this.informations.splice(this.recordToDeleteIndex, 1);
        this.recordToDeleteIndex = null;
        this.clearForm();
        this.closeModal();
        this.saveDataToLocalStorage();
      }
    },
    updateRecord(index) {
      this.recordToEditIndex = index;
      const {
        firstName,
        middleName,
        lastName,
        gender,
        dob,
        address,
        postal
      } = this.informations[index];

      this.formData = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        gender: gender,
        dob: dob,
        address: address,
        postal: postal
      };
      console.log(this.informations[index]);
      this.isUpdating = true;
    },
    editData() {
      if (this.recordToEditIndex !== null) {
        const editedData = { ...this.formData };
        this.informations.splice(this.recordToEditIndex, 1, editedData);

        this.clearForm(); // Clear the form fields
        this.isUpdating = false; // Reset the updating mode
        this.recordToEditIndex = null;
        this.saveDataToLocalStorage();
      }
    },
    clearForm() {
      this.formData = {
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        postal: "",
        middleName: "",
        address: ""
      };
      this.$v.$reset();
    },

    onSubmitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Invalid");
      } else {
        if (this.isUpdating) {
          // If in update mode, update the existing record
          const formDataCopy = Object.assign({}, this.formData);
          this.informations[this.recordToEditIndex] = formDataCopy;
          this.isUpdating = false; // Reset the update mode
        } else {
          // If not in update mode, add a new record
          const formDataCopy = Object.assign({}, this.formData);
          this.informations.push(formDataCopy);
        }
        this.saveDataToLocalStorage();
        this.clearForm();
      }
    }
  }
};
</script>
