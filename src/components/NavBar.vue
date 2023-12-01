<template>
  <header>
    <nav>
      <div class="nav-heading">
        <router-link to="/">BlogApplication</router-link>
      </div>
      <div class="nav-links">
        <router-link to="/todo">Add Information</router-link>
        <router-link to="/">Add Blog</router-link>
        <router-link to="/all">All Blogs </router-link>
      </div>
    </nav>
  </header>

  <!-- <RouterView /> -->
</template>

<script>
// import { RouterLink, RouterView } from "vue-router";
export default {
  data() {
    return {
      msg: "Navbar"
    };
  }
};
</script>

<style>
header {
  background-color: aliceblue;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
a {
  text-decoration: none;
  font-size: 2rem;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
}

.nav-links a {
  margin-right: 5rem;
}
.nav-heading a {
  font-size: 3rem;
  display: inline-block;
  margin-left: 5rem;
}
</style>
