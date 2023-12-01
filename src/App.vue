<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap");

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  line-height: 1.1;
  font-size: 1.6rem;
  color: #333;
}

h1 {
  font-size: 3.6rem;
  margin-bottom: 2rem;
}

.error-message {
  color: #f03e3e;
  font-size: 1.6rem;
  padding: 5px;
  margin-top: -1.5rem;
}

.wrapper {
  width: 70%;
  margin: 5.2rem auto;
  border-radius: 1rem;
  background-color: aliceblue;
  padding: 4rem;
}
.box {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
  letter-spacing: -0.75px;
}
.aftercontent {
  position: relative;
}

.aftercontent::after {
  position: absolute;
  content: "*";
  top: 0;
  right: 10;
  color: red;
}

input,
select {
  border: none;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1.6rem;
  margin-bottom: 2rem;
}
input {
  padding: 1.2rem 1.8rem;
}
select {
  padding: 0.9rem 1.8rem;
}
.box-error input,
.box-error select {
  outline: 1px solid red;
}

.custom-select {
  color: #888; /* Change the color to your desired color */
}

/* Style the selected option text */
.custom-select option {
  color: black; /* Change the color to your desired color */
}
.btn-submit {
  font-size: 1.6rem;
  padding: 1.2rem 2.4rem;
  border-radius: 10rem;
  margin-top: 1.8rem;
}
table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
.btn-action {
  font-size: 1.4rem;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
}
.btn-table {
  display: flex;
  justify-content: space-between;
}
.table-text {
  font-size: 2.4rem;
  text-align: center;
  margin-top: 2rem;
  color: #888;
}
@media (max-width: 59em) {
  html {
    font-size: 56.25%;
  }
}
@media (max-width: 34em) {
  html {
    font-size: 50%;
  }
}
</style>
