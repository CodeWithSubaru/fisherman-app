import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../components/HomeComponent.vue";
import AboutView from "../components/AboutView.vue";
import UserView from "../components/UserView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeComponent,
    },
    {
        path: "/about",
        name: "about",
        component: AboutView,
    },

    {
        path: "/users",
        name: "users",
        component: UserView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
