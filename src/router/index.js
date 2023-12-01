import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import AddBlog from "../views/AddBlog";
import AllBlogs from "../views/AllBlogs";
import UpdateBlog from "../views/UpdateBlog";
import ToDo from "../views/ToDo";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/hello",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/",
      name: "AddBlog",
      component: AddBlog
    },
    {
      path: "/all",
      name: "AllBlogs",
      component: AllBlogs
    },
    {
      path: "/todo",
      name: "ToDo",
      component: ToDo
    },
    {
      path: "/:id",
      name: "UpdateBlog",
      component: UpdateBlog
    }
  ]
});
